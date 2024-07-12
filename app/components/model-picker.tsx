import Image from "next/image";

type ModelPickerProps = {
    updateSelectedModel: (selectedModel: string) => void;
};

const ModelPicker = ({ updateSelectedModel }: ModelPickerProps) => {
    return (
        <div className='absolute top-3 left-3 w-fit h-fit z-[100] bg-teal-500 p-3 md:p-5'>
            <div onClick={() => updateSelectedModel("Shoe")}>
                <Image src='/img/shoe.png' alt='shoe' width={100} height={100} />
                <h4>Shoe</h4>
            </div>
            <div onClick={() => updateSelectedModel("Axe")}>
                <Image src='/img/axe.png' alt='Axe' width={100} height={100} />
                <h4>Axe</h4>
            </div>
            <div onClick={() => updateSelectedModel("Rocket")}>
                <Image src='/img/rocket.png' alt='rocket' width={100} height={100} />
                <h4>Rocket</h4>
            </div>

            <div onClick={() => updateSelectedModel("Insect")}>
                <Image src='/img/insect.png' alt='insect' width={100} height={100} />
                <h4>Insect</h4>
            </div>
            <div onClick={() => updateSelectedModel("Teapot")}>
                <Image src='/img/teapot.png' alt='teapot' width={100} height={100} />
                <h4>Teapot</h4>
            </div>
        </div>
    );
};

export default ModelPicker;
