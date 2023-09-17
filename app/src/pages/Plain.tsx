import { login } from "../services/auth-service";

function Plain() {
    login('saksit','1234');
    return (
        <div className="grow h-screen flex flex-col justify-center items-center relative bg-gray-50">
            <img
                className="w-48 h-48 opacity-50 mb-4"
                src="logo/logo-300.svg"
            ></img>
            <p className="text-3xl font-bold text-gray-300">
                Let's make some conversation
            </p>
        </div>
    );
}

export default Plain;
