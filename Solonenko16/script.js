function createCar(color = 'red', consumption = 2.4, tankVolume = 60) {
    let _tankVolume = tankVolume;
    let _consumption = consumption;
    let _startInterval;
    let leftFuelConsumption;

    function _checkGasInput(isFull, gasVolume) {
        if (typeof isFull !== 'boolean') {
            console.warn('isFull addGas function parameter must be a Boolean');
            return false;
        }

        if (!isFull && !_isNumber(gasVolume)) {
            console.warn('gasVolume addGas function parameter must be a Number');
            return false;
        }
        return true;
    }

    function _isNumber(number) {
        return !isNaN(parseFloat(number)) && isFinite(number);
    }

    function _checkGasVolume(gasVolume) {
        return (car.gasVolume + gasVolume) < _tankVolume && (car.gasVolume + gasVolume) >= 0
    }

    function _checkGasExisting() {
        return car.gasVolume !== 0;
    }

    function _checkDistance(distance) {
    if (!_isNumber(distance) || distance !== distance || distance < 0){
        return console.warn('data Distance is incorrect');
    } else if (distance >= (car.gasVolume/_consumption)){
        return console.warn(`in your fuel tank not enough fuel for this distance! You can ride ${(car.gasVolume/_consumption)-0.01} km`);
    } else if (leftFuelConsumption !== 0){
        return console.warn('You are arrived. Fuel tank is empty');

        }
    return true;
    }

    let car = {
        color: color,
        gasVolume: 0,
        ignition: false,
        checkGas() {
            return car.gasVolume.toFixed(2);
        },
        addGas(isFull = false, gasVolume = 0) {
            if(!_checkGasInput(isFull, gasVolume)) {
                return;
            }

            if (isFull) {
                car.gasVolume = _tankVolume;
            } else {
                if (_checkGasVolume(gasVolume)) {
                    car.gasVolume += gasVolume;
                } else {
                    console.warn(`gas volume is to large. You can add ${_tankVolume - car.gasVolume} L`);
                }
            }
        },
        start() {
            if(car.gasVolume === 0) {
                console.warn('Fuel not found');
                return;
            }

            car.ignition = true;
            _startInterval = setInterval(function () {
                if(_checkGasExisting()) {
                    car.gasVolume -= 0.01;
                } else {
                    car.stop();
                    console.warn('You are looser');
                }
            }, 1000)
        },
        stop() {
            car.ignition = false;
            clearInterval(_startInterval);
        },

        ride(distance) {
            this.ignition = true;
            if (_checkDistance(distance)){
                leftFuelConsumption = (car.gasVolume -= (distance * _consumption)).toFixed(2);
                return console.log(`The ${leftFuelConsumption} L fuel is left in tank`);
            }
        }
    }
    return car;
}
