import { useState } from 'react';
import OtpInput from 'react-otp-input';

import "./PinInput.scss"

const PinInput = () => {

    const [otp, setOtp] = useState('');

    return (
        <OtpInput
            value={otp}
            onChange={setOtp}
            numInputs={6}
            renderInput={(props) => <input  {...props} placeholder='0' />}
            inputStyle="pin-inp"
            containerStyle="pin-inp-wrap"
        />
    )
}

export default PinInput