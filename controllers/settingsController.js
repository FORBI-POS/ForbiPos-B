import settingsService from '../services/settingsService.js';

const getSettings = async (req, res) => {
    try {
        const settings = await settingsService.getSettings();
        res.status(200).json(settings);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

const updateSettings = async (req, res) => {
    try {
        const settings = await settingsService.updateSettings(req.body);
        res.status(200).json(settings);
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
};

export default {
    getSettings,
    updateSettings,
};
