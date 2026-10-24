import { useState } from "react";
import StudentResetPasswordModal from "./StudentResetPasswordModal";
import FacultyResetPasswordModal from "./FacultyResetPasswordModal";
import OtpFormModal from "./OtpFormModal";
import SetPasswordForm from "./SetPasswordFormModal";

type Props = {
    role: string;
    onSuccess: (title: string, message: string) => void;
    onFail: (title: string, message: string) => void;
    onClose: () => void;
};

const PasswordResetHandler = ({
    role,
    onSuccess,
    onFail,
    onClose,
}: Props) => {

    const [no, setNo] = useState('');
    const [resetState, setResetState] = useState('email');
    const [resetToken, setResetToken] = useState('');

    const getOtpModal = (no: string) => {
        setNo(no);
        onSuccess('Success', 'OTP sent to your email address.');
        setResetState('otp');
    }

    const handleClose = () => {

    }

    const changePassword = (token: string) => {
        onSuccess('Success', 'OTP is verified.');
        setResetState('reset');
    }

    switch(resetState) {
        case 'email':
            if(role === 'STUDENT') {
                return <StudentResetPasswordModal onClose={onClose} onFail={onFail} getOtpModal={getOtpModal} />
            }
            else {
                return <div></div>
            }
        case 'otp':
            return <OtpFormModal no={no} role={role} onFail={onFail} onClose={handleClose} changePassword={changePassword} />
    }

    // return (
        
    //     <SetPasswordForm />
    // );
};

export default PasswordResetHandler;