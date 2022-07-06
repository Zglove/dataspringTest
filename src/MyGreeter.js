
class Client {
    constructor() {}

    /**
     * 根据所传字符获取对应的问候语，timeStr为空时会自动计算当前时间
     * @param timeStr: String Type，如 `06:40am` 、`12:01pm`
     * @return 对应问候语 or 异常信息
    */
    getGreeting(timeStr) {

        // 默认计算当前时间
        if (typeof timeStr == 'undefined') {
            return this.defaultGreeting();
        }
        
        if (typeof timeStr !== 'string') {
            return 'invalid parameter';
        }

        const regex = new RegExp(/^([0-1]\d):([0-5]\d)(?:AM|PM)?$/i);
        timeStr = timeStr.toLowerCase();
        if (!regex.test(timeStr)) {
            return 'invalid parameter';
        }
        
        const hour = parseInt(timeStr.split(':')[0]);
        var greeting = '';
        if (timeStr.endsWith('am')) {
            
            if (hour >= 0 && hour < 6) {
                greeting = 'Good evening';
            }else if (hour >= 6 && hour < 12) {
                greeting = 'Good morning';
            }else {
                greeting = 'invalid parameter';
            }

        }else if (timeStr.endsWith('pm')) {
            
            if ((hour > 0 && hour < 6) || hour == 12) {
                greeting = 'Good afternoon';
            }else if (hour >= 6 && hour < 12) {
                greeting = 'Good evening';
            }else {
                greeting = 'invalid parameter';
            }
        }else {
            return 'invalid parameter';
        }
        return greeting;
    }

    // 获取当前时间下的问候语
    defaultGreeting() {
        const hour = new Date().getHours();
        var greeting = '';
        if (hour >= 6 && hour < 12) {
            greeting = "Good morning"
        }else if(hour >= 12 && hour < 18) {
            greeting = "Good afternoon"
        }else {
            greeting = "Good evening"
        }
        return greeting;
    }
}

module.exports = {
    Client
}