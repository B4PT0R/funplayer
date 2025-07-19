import { 
  ButtplugClient, 
  ButtplugBrowserWebsocketClientConnector,
  ActuatorType
} from 'buttplug';
import VirtualDevice from './VirtualDevice';
import { Actuator } from './Actuator';
import { Capability, HapticType, CapabilityToHapticType } from './constants';

/**
 * ButtPlugManager - ✅ REFACTORISÉ: Status notifications uniformisées
 */
class ButtPlugManager {
  constructor(notify) {
    this.notify = notify;
    
    // Core buttplug
    this.client = null;
    this.connector = null;
    this.initialized = false;
    this.intifaceUrl = 'ws://localhost:12345';
    
    // Device state
    this.devices = new Map();
    this.isConnected = false;
    this.isScanning = false;
    
    // VirtualDevice toujours disponible
    this.virtualDevice = new VirtualDevice(this.notify)
    this.devices.set(-1, this.virtualDevice);
    this.selectedDevice = this.virtualDevice;
    
    // Actuators array
    this.actuators = [];
    this._initActuators();
    
    // Global modulation
    this.globalScale = 1.0;
    this.globalOffset = 0.0;
    
    // Performance & config
    this.throttleMap = new Map();
    this.minCommandInterval = 16;
  }

  // ============================================================================
  // SECTION 1: DEVICE CONNECTION & MANAGEMENT
  // ============================================================================

  async init() {
    if (this.initialized) return true;

    try {
      // ✅ NOUVEAU: Status notification au lieu de console.log
      this.notify?.('status:buttplug', { 
        message: 'Initializing ButtPlug client...', 
        type: 'processing' 
      });

      this.client = new ButtplugClient('FunPlayer');
      this.connector = new ButtplugBrowserWebsocketClientConnector(this.intifaceUrl);
      
      this.client.addListener('deviceadded', this._onDeviceAdded);
      this.client.addListener('deviceremoved', this._onDeviceRemoved);
      this.client.addListener('disconnect', this._onDisconnect);
      
      this.initialized = true;
      
      // ✅ NOUVEAU: Log technique silencieux
      this.notify?.('status:buttplug', { 
        message: 'ButtPlug client initialized successfully', 
        type: 'log' 
      });
      
      return true;

    } catch (error) {
      // ✅ NOUVEAU: Erreur structurée au lieu de console.error
      this.notify?.('status:buttplug', { 
        message: 'Failed to initialize ButtPlug client', 
        type: 'error',
        error: error.message || String(error)
      });
      
      this.notify?.('buttplug:error', { message: 'Initialization failed', error: error.message || String(error) });
      
      return false;
    }
  }

  async connect(address = null) {
    if (this.isConnected) return true;

    const targetUrl = address || this.intifaceUrl;
    if (!this.initialized) {
      const initSuccess = await this.init();
      if (!initSuccess) return false;
    }

    if (this.connector._url !== targetUrl) {
      this.connector = new ButtplugBrowserWebsocketClientConnector(targetUrl);
    }

    try {
      // ✅ NOUVEAU: Status au lieu de console.log
      this.notify?.('status:buttplug', { 
        message: `Connecting to ${targetUrl}...`, 
        type: 'processing' 
      });
      
      await this.client.connect(this.connector);
      this.isConnected = true;
      
      if (address && address !== this.intifaceUrl) {
        this.setIntifaceUrl(address);
      }
      
      const existingDevices = this.client.devices;
      existingDevices.forEach(device => {
        this.devices.set(device.index, device);
      });
      
      // ✅ NOUVEAU: Status succès + log technique
      this.notify?.('status:buttplug', { 
        message: `Connected to Intiface Central`, 
        type: 'success' 
      });
      
      this.notify?.('status:buttplug', { 
        message: `Found ${existingDevices.length} existing devices (+ Virtual)`, 
        type: 'log' 
      });
      
      this.notify?.('buttplug:connection', { connected: true });
      
      return true;

    } catch (error) {
      // ✅ NOUVEAU: Erreur structurée
      this.notify?.('status:buttplug', { 
        message: 'Failed to connect to Intiface Central', 
        type: 'error',
        error: error.message || String(error)
      });
      
      this.notify?.('buttplug:error', { message: 'Connection failed', error: error.message || String(error) });
      
      return false;
    }
  }

  async scan(timeout = 5000) {
    if (!this.isConnected || this.isScanning) return [];

    try {
      this.isScanning = true;
      
      // ✅ CAPTURE des indices existants AVANT le scan
      const existingIndices = new Set(this.devices.keys());
      
      this.notify?.('status:buttplug', { 
        message: 'Scanning for devices...', 
        type: 'processing' 
      });
      
      await this.client.startScanning();
      await new Promise(resolve => setTimeout(resolve, timeout));
      await this.client.stopScanning();
      
      // ✅ SYNCHRONISATION: Mettre à jour notre Map avec ce que buttplug a trouvé
      const foundDevices = this.client.devices;
      foundDevices.forEach(device => {
        this.devices.set(device.index, device);
      });
      
      // ✅ FILTRAGE basé sur les indices qu'on avait avant
      const newDevices = Array.from(this.devices.values())
        .filter(device => !existingIndices.has(device.index));
      
      if (newDevices.length > 0) {
        this.notify?.('status:buttplug', { 
          message: `Found ${newDevices.length} new device(s)`, 
          type: 'success' 
        });
      } else {
        this.notify?.('status:buttplug', { 
          message: 'No new devices found', 
          type: 'info' 
        });
      }
      
      return newDevices;
      
    } catch (error) {
      this.notify?.('status:buttplug', { 
        message: 'Device scan failed', 
        type: 'error',
        error: error.message || String(error)
      });
      return [];
    } finally {
      this.isScanning = false;
    }
  }

  async disconnect() {
    if (!this.isConnected) return;
    
    try {
      if (this.client) {
        await this.client.disconnect();
      }
      
      // ✅ NOUVEAU: Status disconnection
      this.notify?.('status:buttplug', { 
        message: 'Disconnected from Intiface Central', 
        type: 'info' 
      });
      
    } catch (error) {
      // ✅ NOUVEAU: Erreur disconnection (log technique)
      this.notify?.('status:buttplug', { 
        message: `Disconnect error: ${error.message}`, 
        type: 'log' 
      });
    }
    
    this._resetConnectionState();
  }

  selectDevice(deviceIndex) {
    if (deviceIndex === null || deviceIndex === undefined) {
      return this.selectDevice(-1); // VirtualDevice par défaut
    }

    const device = this.devices.get(deviceIndex);
    if (!device) {
      // ✅ NOUVEAU: Erreur device not found
      this.notify?.('status:buttplug', { 
        message: `Device ${deviceIndex} not found`, 
        type: 'error' 
      });
      return false;
    }

    this.selectedDevice = device;
    this._initActuators(); // Reconstruire array d'actuateurs
    
    const deviceType = deviceIndex === -1 ? 'Virtual Device' : device.name;
    
    // ✅ NOUVEAU: Status device selected
    this.notify?.('status:buttplug', { 
      message: `Selected: ${deviceType}`, 
      type: 'success' 
    });
    
    this.notify?.('buttplug:device', { device });
    
    return true;
  }

  // ============================================================================
  // SECTION 2: ACTUATORS MANAGEMENT
  // ============================================================================

  _initActuators() {
    // Débrancher tous les actuateurs existants
    this.actuators.forEach(actuator => actuator.unplug());
    this.actuators = [];

    if (!this.selectedDevice) return;

    this.actuators = this._buildActuators(this.selectedDevice);
    
    // ✅ NOUVEAU: Log technique actuators
    this.notify?.('status:buttplug', { 
      message: `Built ${this.actuators.length} actuators for ${this.selectedDevice.name}`, 
      type: 'log' 
    });
  }

  _buildActuators(device) {
    const messageAttrs = device.messageAttributes;
    const actuators = [];

    // ✅ NOUVEAU: Log technique détaillé
    this.notify?.('status:buttplug', { 
      message: `Building actuators for device: ${device.name}`, 
      type: 'log' 
    });
    
    this.notify?.('status:buttplug', { 
      message: `Device messageAttributes: ${JSON.stringify(messageAttrs)}`, 
      type: 'log' 
    });

    // ScalarCmd - Créer un actuateur par ActuatorType
    if (messageAttrs.ScalarCmd) {
      messageAttrs.ScalarCmd.forEach(attr => {
        this.notify?.('status:buttplug', { 
          message: `Processing ScalarCmd attr: ${JSON.stringify(attr)}`, 
          type: 'log' 
        });
        
        let capability, type;
        
        if (attr.ActuatorType === ActuatorType.Vibrate) {
          this.notify?.('status:buttplug', { 
            message: 'Matched Vibrate actuator', 
            type: 'log' 
          });
          capability = Capability.VIBRATE;
          type = HapticType.SCALAR;
        } else if (attr.ActuatorType === ActuatorType.Oscillate) {
          this.notify?.('status:buttplug', { 
            message: 'Matched Oscillate actuator', 
            type: 'log' 
          });
          capability = Capability.OSCILLATE;
          type = HapticType.SCALAR;
        } else {
          this.notify?.('status:buttplug', { 
            message: `No match for ActuatorType: ${attr.ActuatorType}`, 
            type: 'log' 
          });
        }
        
        if (capability) {
          this.notify?.('status:buttplug', { 
            message: `Creating actuator with capability: ${capability}`, 
            type: 'log' 
          });
          const actuator = new Actuator(attr.Index, capability, {
            metadata: {
              name: `${device.name} #${attr.Index}`,
              featureDescriptor: attr.FeatureDescriptor || '',
              stepCount: attr.StepCount || 20
            }
          }, this.notify);
          actuators.push(actuator);
        }
      });
    }

    // LinearCmd - Créer un actuateur linear par index
    if (messageAttrs.LinearCmd) {
      messageAttrs.LinearCmd.forEach(attr => {
        this.notify?.('status:buttplug', { 
          message: `Processing LinearCmd attr: ${JSON.stringify(attr)}`, 
          type: 'log' 
        });
        const actuator = new Actuator(attr.Index, Capability.LINEAR, {
          metadata: {
            name: `${device.name} #${attr.Index}`,
            featureDescriptor: attr.FeatureDescriptor || '',
            stepCount: attr.StepCount || 20
          }
        }, this.notify);
        actuators.push(actuator);
      });
    }

    // RotateCmd - Créer un actuateur rotate par index
    if (messageAttrs.RotateCmd) {
      messageAttrs.RotateCmd.forEach(attr => {
        this.notify?.('status:buttplug', { 
          message: `Processing RotateCmd attr: ${JSON.stringify(attr)}`, 
          type: 'log' 
        });
        const actuator = new Actuator(attr.Index, Capability.ROTATE, {
          metadata: {
            name: `${device.name} #${attr.Index}`,
            featureDescriptor: attr.FeatureDescriptor || '',
            stepCount: attr.StepCount || 20
          }
        }, this.notify);
        actuators.push(actuator);
      });
    }

    // Trier par index pour un ordre cohérent
    actuators.sort((a, b) => a.index - b.index);

    this.notify?.('status:buttplug', { 
      message: `Final actuators array: ${actuators.length} actuators`, 
      type: 'log' 
    });
    
    return actuators;
  }

  // ============================================================================
  // SECTION 3: API SIMPLIFIÉE
  // ============================================================================

  getActuators() {
    return [...this.actuators];
  }

  getActuator(index) {
    return this.actuators.find(actuator => actuator.index === index) || null;
  }

  getActuatorsByCapability(capability) {
    return this.actuators.filter(actuator => actuator.capability === capability);
  }

  setActuatorSettings(actuatorIndex, settings) {
    const actuator = this.getActuator(actuatorIndex);
    if (!actuator) return false;

    actuator.updateSettings(settings);
    this.notify?.('buttplug:actuatorOptions', { actuatorIndex, options: actuator.settings });
    
    return true;
  }

  getActuatorSettings(actuatorIndex) {
    const actuator = this.getActuator(actuatorIndex);
    return actuator ? { ...actuator.settings } : null;
  }

  plugChannelToActuator(channel, actuatorIndex) {
    const actuator = this.getActuator(actuatorIndex);
    if (!actuator) return false;

    const success = channel.plug(actuator);
    if (success) {
      this.notify?.('buttplug:mapping', { channel: channel.name, actuatorIndex });
    }
    return success;
  }

  unplugChannelFromActuator(channel, actuatorIndex) {
    const actuator = this.getActuator(actuatorIndex);
    if (!actuator) return false;

    channel.unplug(actuator);
    this.notify?.('buttplug:mapping', { channel: channel.name, actuatorIndex: null });
    
    return true;
  }

  unplugAllChannels() {
    this.actuators.forEach(actuator => actuator.unplug());
    this.notify?.('buttplug:mapping', { channel: null, actuatorIndex: null });
  }

  // ============================================================================
  // SECTION 4: GLOBAL MODULATION
  // ============================================================================

  setGlobalScale(scale) {
    const newScale = typeof scale === 'number' ? Math.max(0, Math.min(5.0, scale)) : 1.0;
    
    if (this.globalScale !== newScale) {
      this.globalScale = newScale;
      this.notify?.('buttplug:globalScale', { scale: newScale });
    }
  }

  getGlobalScale() {
    return this.globalScale;
  }

  setGlobalOffset(offset) {
    const newOffset = typeof offset === 'number' ? offset : 0.0;
    
    if (this.globalOffset !== newOffset) {
      this.globalOffset = newOffset;
      this.notify?.('buttplug:globalOffset', { offset: newOffset });
    }
  }

  getGlobalOffset() {
    return this.globalOffset;
  }

  // ============================================================================
  // SECTION 5: HAPTIC ORCHESTRATION
  // ============================================================================

  getTimeWithOffsets(currentTime) {
    const channelTimings = new Map();
    
    for (const actuator of this.actuators) {
      if (actuator.isPlugged() && actuator.settings.enabled) {
        const channel = actuator.assignedChannel;
        const adjustedTime = currentTime + this.globalOffset + actuator.settings.timeOffset;
        channelTimings.set(channel.name, adjustedTime);
      }
    }
    
    return channelTimings;
  }

  async processChannels(rawValues) {
    if (!this.selectedDevice) {
      return new Map();
    }

    const visualizerData = new Map();
    
    for (const actuator of this.actuators) {
      if (actuator.isPlugged() && actuator.settings.enabled) {
        const channel = actuator.assignedChannel;
        const rawValue = rawValues[channel.name];
        
        if (rawValue !== undefined && rawValue !== null) {
          // Traiter la valeur via l'actuateur
          const command = actuator.process(rawValue, this.globalScale);
          
          // Envoyer au device
          await this.sendThrottled(actuator.capability, command.value, actuator.index, command.options);
          
          // Préparer données visualizer
          visualizerData.set(actuator.index, {
            value: command.value,
            type: actuator.capability
          });
        }
      }
    }

    return visualizerData;
  }

  // ============================================================================
  // SECTION 6: DEVICE COMMANDS
  // ============================================================================

  async vibrate(value, actuatorIndex = null) {
    return this._sendScalarCommand(ActuatorType.Vibrate, value, actuatorIndex);
  }

  async oscillate(value, actuatorIndex = null) {
    return this._sendScalarCommand(ActuatorType.Oscillate, value, actuatorIndex);
  }

  async linear(value, duration = 100, actuatorIndex = null) {
    if (!this.selectedDevice) throw new Error('No device selected');
    
    const resolvedIndex = this._resolveActuatorIndex(Capability.LINEAR, actuatorIndex);
    if (resolvedIndex === null) throw new Error('No linear actuator available');

    try {
      const clampedValue = Math.max(0, Math.min(1, value));
      const clampedDuration = Math.max(1, Math.min(20000, duration));
      
      await this.selectedDevice.linear([[clampedValue, clampedDuration]]);
      return true;
    } catch (error) {
      // ✅ NOUVEAU: Erreur commande (log technique)
      this.notify?.('status:buttplug', { 
        message: `Linear command failed: ${error.message}`, 
        type: 'log' 
      });
      return false;
    }
  }

  async rotate(value, actuatorIndex = null) {
    if (!this.selectedDevice) throw new Error('No device selected');
    
    const resolvedIndex = this._resolveActuatorIndex(Capability.ROTATE, actuatorIndex);
    if (resolvedIndex === null) throw new Error('No rotate actuator available');

    try {
      const speed = Math.abs(value);
      const clockwise = value >= 0;
      
      await this.selectedDevice.rotate([[speed, clockwise]]);
      return true;
    } catch (error) {
      // ✅ NOUVEAU: Erreur commande (log technique)
      this.notify?.('status:buttplug', { 
        message: `Rotate command failed: ${error.message}`, 
        type: 'log' 
      });
      return false;
    }
  }

  async sendThrottled(capability, value, actuatorIndex, options = {}) {
    const now = Date.now();
    const key = `${capability}-${actuatorIndex}`;
    const lastSent = this.throttleMap.get(key) || 0;
    
    if (now - lastSent < this.minCommandInterval && !options.force) {
      return true;
    }
    
    this.throttleMap.set(key, now);
    
    try {
      switch (capability) {
        case Capability.VIBRATE:
          return await this.vibrate(value, actuatorIndex);
        case Capability.OSCILLATE:
          return await this.oscillate(value, actuatorIndex);
        case Capability.LINEAR:
          return await this.linear(value, options.duration || 100, actuatorIndex);
        case Capability.ROTATE:
          return await this.rotate(value, actuatorIndex);
        default:
          // ✅ NOUVEAU: Erreur capability inconnue (log technique)
          this.notify?.('status:buttplug', { 
            message: `Unknown capability: ${capability}`, 
            type: 'log' 
          });
          return false;
      }
    } catch (error) {
      return false; // Silent fail
    }
  }

  async stopAll() {
    if (!this.isConnected || !this.client) return;
    
    try {
      await this.client.stopAllDevices();
      
      // ✅ NOUVEAU: Status stop all (log technique)
      this.notify?.('status:buttplug', { 
        message: 'All devices stopped', 
        type: 'log' 
      });
    } catch (error) {
      // ✅ NOUVEAU: Erreur stop all (log technique)
      this.notify?.('status:buttplug', { 
        message: `Stop all failed: ${error.message}`, 
        type: 'log' 
      });
    }
  }

  // ============================================================================
  // SECTION 7: UTILITIES & INFO
  // ============================================================================

  getDevices() {
    return Array.from(this.devices.values());
  }

  getSelected() {
    return this.selectedDevice;
  }

  getDeviceInfo() {
    if (!this.selectedDevice) return null;

    return {
      deviceName: this.selectedDevice.name,
      deviceIndex: this.selectedDevice.index,
      actuatorCount: this.actuators.length,
      actuators: this.actuators.map(actuator => ({
        index: actuator.index,
        type: actuator.type,
        capability: actuator.capability,
        enabled: actuator.settings.enabled,
        assignedChannel: actuator.getAssignedChannelName(),
        metadata: actuator.metadata
      })),
      messageTimingGap: this.selectedDevice.messageTimingGap || 0
    };
  }

  getStatus() {
    return {
      isConnected: this.isConnected,
      isScanning: this.isScanning,
      deviceCount: this.devices.size,
      selectedDevice: this.selectedDevice ? {
        index: this.selectedDevice.index,
        name: this.selectedDevice.name
      } : null,
      actuatorCount: this.actuators.length,
      globalScale: this.globalScale,
      globalOffset: this.globalOffset,
      config: { intifaceUrl: this.intifaceUrl }
    };
  }

  setIntifaceUrl(url) {
    const cleanUrl = this._validateAndCleanUrl(url);
    
    if (this.intifaceUrl !== cleanUrl) {
      const wasConnected = this.isConnected;
      const oldUrl = this.intifaceUrl;
      
      this.intifaceUrl = cleanUrl;
      
      if (this.connector && this.connector._url !== cleanUrl) {
        this.connector = new ButtplugBrowserWebsocketClientConnector(cleanUrl);
      }
      
      // ✅ NOUVEAU: Status URL change (log technique)
      this.notify?.('status:buttplug', { 
        message: `URL changed: ${oldUrl} → ${cleanUrl}`, 
        type: 'log' 
      });
      
      this.notify?.('buttplug:config', { 
        key: 'intifaceUrl', 
        data: { oldUrl, newUrl: cleanUrl, wasConnected } 
      });
    }
  }

  getIntifaceUrl() {
    return this.intifaceUrl;
  }

  // ============================================================================
  // SECTION 8: PRIVATE METHODS
  // ============================================================================

  _sendScalarCommand = async (actuatorType, value, actuatorIndex = null) => {
    if (!this.selectedDevice) throw new Error('No device selected');

    const capability = actuatorType === ActuatorType.Vibrate ? Capability.VIBRATE : Capability.OSCILLATE;
    const resolvedIndex = this._resolveActuatorIndex(capability, actuatorIndex);
    
    if (resolvedIndex === null) {
      throw new Error(`No ${actuatorType} actuator available`);
    }

    try {
      const clampedValue = Math.max(0, Math.min(1, value));
      
      if (actuatorType === ActuatorType.Vibrate) {
        await this.selectedDevice.vibrate(clampedValue);
      } else if (actuatorType === ActuatorType.Oscillate) {
        await this.selectedDevice.oscillate(clampedValue);
      }
      
      return true;
    } catch (error) {
      // ✅ NOUVEAU: Erreur scalar command (log technique)
      this.notify?.('status:buttplug', { 
        message: `${actuatorType} command failed: ${error.message}`, 
        type: 'log' 
      });
      return false;
    }
  }

  _resolveActuatorIndex = (capability, requestedIndex) => {
    if (requestedIndex !== null && requestedIndex !== undefined) {
      const actuator = this.getActuator(requestedIndex);
      if (actuator && actuator.capability === capability) {
        return requestedIndex;
      }
      return null;
    }
    
    const available = this.getActuatorsByCapability(capability);
    return available.length > 0 ? available[0].index : null;
  }

  _validateAndCleanUrl(url) {
    if (!url || typeof url !== 'string') {
      return 'ws://localhost:12345';
    }
    
    let cleanUrl = url.trim();
    
    if (!cleanUrl.startsWith('ws://') && !cleanUrl.startsWith('wss://')) {
      cleanUrl = 'ws://' + cleanUrl;
    }
    
    try {
      const urlObj = new URL(cleanUrl);
      if (!urlObj.port) {
        urlObj.port = '12345';
        cleanUrl = urlObj.toString();
      }
    } catch (error) {
      // ✅ NOUVEAU: Warning URL invalide (log technique)
      this.notify?.('status:buttplug', { 
        message: `Invalid WebSocket URL, using default: ${url}`, 
        type: 'log' 
      });
      return 'ws://localhost:12345';
    }
    
    return cleanUrl;
  }

  _resetDevice = () => {
    this.selectedDevice = this.virtualDevice;
    this._initActuators();
    this._notifyDeviceChanged(this.virtualDevice);
  }

  _resetConnectionState = () => {
    this.isConnected = false;
    this.isScanning = false;
    
    this.devices.clear();
    this.devices.set(-1, this.virtualDevice);
    
    this.throttleMap.clear();
    this._resetDevice();
    
    this.notify?.('buttplug:connection', { connected: false });
  }

  // ============================================================================
  // SECTION 9: EVENT HANDLERS & NOTIFICATIONS
  // ============================================================================

  _onDeviceAdded = (device) => {
    this.devices.set(device.index, device);
    
    // ✅ NOUVEAU: Status device added
    this.notify?.('status:buttplug', { 
      message: `Device connected: ${device.name}`, 
      type: 'success' 
    });
    
    this.notify?.('buttplug:device', { device: undefined }); // Device list changed
  }

  _onDeviceRemoved = (device) => {
    this.devices.delete(device.index);
    
    if (this.selectedDevice?.index === device.index) {
      this.selectDevice(-1); // Retomber sur VirtualDevice
    }
    
    // ✅ NOUVEAU: Status device removed
    this.notify?.('status:buttplug', { 
      message: `Device disconnected: ${device.name}`, 
      type: 'info' 
    });
    
    this.notify?.('buttplug:device', { device: undefined }); // Device list changed
  }

  _onDisconnect = () => {
    // ✅ NOUVEAU: Status disconnection
    this.notify?.('status:buttplug', { 
      message: 'Lost connection to Intiface Central', 
      type: 'error' 
    });
    
    this._resetConnectionState();
  }

  // ============================================================================
  // SECTION 10: CLEANUP
  // ============================================================================

  async cleanup() {
    // Stop all devices
    if (this.isConnected && this.client) {
      try {
        await this.client.stopAllDevices();
      } catch (error) {
        // ✅ NOUVEAU: Erreur cleanup (log technique)
        this.notify?.('status:buttplug', { 
          message: `Stop all devices failed during cleanup: ${error.message}`, 
          type: 'log' 
        });
      }
    }
    
    // Disconnect
    if (this.isConnected && this.client) {
      try {
        await this.client.disconnect();
      } catch (error) {
        // ✅ NOUVEAU: Erreur cleanup (log technique)
        this.notify?.('status:buttplug', { 
          message: `Disconnect failed during cleanup: ${error.message}`, 
          type: 'log' 
        });
      }
    }
    
    // Cleanup references
    if (this.client) {
      try {
        this.client.removeAllListeners();
      } catch (error) {
        // ✅ NOUVEAU: Erreur cleanup (log technique)
        this.notify?.('status:buttplug', { 
          message: `Remove listeners failed during cleanup: ${error.message}`, 
          type: 'log' 
        });
      }
      this.client = null;
    }
    
    this.connector = null;
    this.throttleMap.clear();
    
    // Débrancher tous les actuateurs
    this.actuators.forEach(actuator => actuator.unplug());
    this.actuators = [];
    
    this.initialized = false;
    this.isConnected = false;
    this.isScanning = false;
    this.devices.clear();
    this.devices.set(-1, this.virtualDevice);
    this._resetDevice();

    // ✅ NOUVEAU: Status cleanup complet
    this.notify?.('status:buttplug', { 
      message: 'ButtPlug cleanup completed', 
      type: 'log' 
    });
  }
}

export default ButtPlugManager;