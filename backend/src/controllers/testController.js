class HealthController {

    static test = (req, res) => {
        res.json({ "test": "ok" });
    };
    
}

module.exports = HealthController;