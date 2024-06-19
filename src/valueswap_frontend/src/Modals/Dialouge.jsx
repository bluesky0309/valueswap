const DialogBox = ({ text }) => {
    return (
        <div className=" z-50 inset-0 flex justify-center items-center mx-auto ">
            <div className="bg-[#010427] text-white p-4 rounded-lg shadow-xl font-cabin text-lg font-medium">
                <p>{text}</p>
            </div>
        </div>
    );
};

export default DialogBox;
