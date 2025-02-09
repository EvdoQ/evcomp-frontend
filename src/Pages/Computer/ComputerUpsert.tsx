import React, { useEffect, useState } from "react";
import {
    useCreateComputerMutation,
    useGetComputerByIdQuery,
    useUpdateComputerMutation,
} from "../../Apis/computerApi";
import { useNavigate, useParams } from "react-router-dom";
import { MainLoader } from "../../Components/Page/Common";
import withAdminAuth from "../../HigherOrderComponent/withAdminAuth";

const computerData = {
    title: "",
    shortDescription: "",
    description: "",
    price: 0,
    processor: "",
    graphicsCard: "",
    motherboard: "",
    powerSupply: "",
    ram: "",
    storage: "",
    processorCooler: "",
    case: "",
    color: "",
    hasWiFi: false,
    hasLightingControl: false,
};

function ComputerUpsert() {
    const { id } = useParams();

    const navigate = useNavigate();
    const [imageToStore, setImageToStore] = useState<any>();
    const [imageToDisplay, setImageToDisplay] = useState<string>("");
    const [computerInputs, setComputerInputs] = useState(computerData);
    const [loading, setLoading] = useState(false);
    const [createComputer] = useCreateComputerMutation();
    const [updateComputer] = useUpdateComputerMutation();
    const { data } = useGetComputerByIdQuery(id);

    useEffect(() => {
        if (data) {
            const tempData = {
                title: data.title,
                shortDescription: data.shortDescription,
                description: data.description,
                price: data.price,
                processor: data.processor,
                graphicsCard: data.graphicsCard,
                motherboard: data.motherboard,
                powerSupply: data.powerSupply,
                ram: data.ram,
                storage: data.storage,
                processorCooler: data.processorCooler,
                case: data.case,
                color: data.color,
                hasWiFi: data.hasWiFi,
                hasLightingControl: data.hasLightingControl,
            };
            setComputerInputs(tempData);
            setImageToDisplay(data.image);
        }
    }, [data]);

    const handleComputerInput = (
        e: React.ChangeEvent<
            HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement
        >
    ) => {
        setComputerInputs((prev) => ({
            ...prev,
            [e.target.name]: e.target.value,
        }));
    };

    const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const file = e.target.files && e.target.files[0];
        if (file) {
            const imgType = file.type.split("/")[1];
            const validImgTypes = ["jpeg", "jpg", "png"];

            const isImageTypeValid = validImgTypes.filter((e) => {
                return e === imgType;
            });

            if (file.size > 1000 * 1024) {
                setImageToStore("");
                return;
            } else if (isImageTypeValid.length === 0) {
                setImageToStore("");
                return;
            }

            const reader = new FileReader();
            reader.readAsDataURL(file);
            setImageToStore(file);
            reader.onload = (e) => {
                const imgUrl = e.target?.result as string;
                setImageToDisplay(imgUrl);
            };
        }
    };

    const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        setLoading(true);
        if (!imageToStore && !id) {
            setLoading(false);
            return;
        }

        const formData = new FormData();

        formData.append("Title", computerInputs.title);
        formData.append("ShortDescription", computerInputs.shortDescription);
        formData.append("Price", computerInputs.price.toString());
        formData.append("Processor", computerInputs.processor);
        formData.append("GraphicsCard", computerInputs.graphicsCard);
        formData.append("Motherboard", computerInputs.motherboard);
        formData.append("PowerSupply", computerInputs.powerSupply);
        formData.append("RAM", computerInputs.ram);
        formData.append("Storage", computerInputs.storage);
        formData.append("ProcessorCooler", computerInputs.processorCooler);
        formData.append("Case", computerInputs.case);
        formData.append("Color", computerInputs.color);
        formData.append("HasWiFi", computerInputs.hasWiFi.toString());
        formData.append(
            "HasLightingControl",
            computerInputs.hasLightingControl.toString()
        );
        if (imageToDisplay) formData.append("File", imageToStore);

        let response;

        if (id) {
            formData.append("Id", id);
            response = await updateComputer({ data: formData, id });
        } else {
            response = await createComputer(formData);
        }

        if (response) {
            setLoading(false);
            navigate("/computer/computerlist");
        }

        setLoading(false);
    };

    return (
        <div className="container border mt-5 p-5 bg-light">
            {loading && <MainLoader />}
            <h3 className=" px-2">
                {id ? "Изменить хар-ки компьютера" : "Добавить компьютер"}
            </h3>
            <form
                method="post"
                encType="multipart/form-data"
                onSubmit={handleSubmit}
            >
                <div className="row mt-3">
                    <div className="col-md-7">
                        <input
                            type="text"
                            className="form-control"
                            placeholder="Введите название"
                            required
                            name="title"
                            value={computerInputs.title}
                            onChange={handleComputerInput}
                        />
                        <textarea
                            className="form-control mt-3"
                            placeholder="Введите короткое описание"
                            name="shortDescription"
                            rows={10}
                            value={computerInputs.shortDescription}
                            onChange={handleComputerInput}
                            style={{ maxHeight: "75px", overflowY: "auto" }}
                        ></textarea>
                        <input
                            type="number"
                            className="form-control mt-3"
                            required
                            placeholder="Введите цену"
                            name="price"
                            value={computerInputs.price}
                            onChange={handleComputerInput}
                        />
                        <input
                            type="text"
                            className="form-control mt-3"
                            placeholder="Введите модель процессора"
                            name="processor"
                            value={computerInputs.processor}
                            onChange={handleComputerInput}
                        />
                        <input
                            type="text"
                            className="form-control mt-3"
                            placeholder="Введите модель видеокарты"
                            name="graphicsCard"
                            value={computerInputs.graphicsCard}
                            onChange={handleComputerInput}
                        />
                        <input
                            type="text"
                            className="form-control mt-3"
                            placeholder="Введите модель материнской платы"
                            name="motherboard"
                            value={computerInputs.motherboard}
                            onChange={handleComputerInput}
                        />
                        <input
                            type="text"
                            className="form-control mt-3"
                            placeholder="Введите модель блока питания"
                            name="powerSupply"
                            value={computerInputs.powerSupply}
                            onChange={handleComputerInput}
                        />
                        <input
                            type="text"
                            className="form-control mt-3"
                            placeholder="Введите модель оперативной памяти"
                            name="ram"
                            value={computerInputs.ram}
                            onChange={handleComputerInput}
                        />
                        <input
                            type="text"
                            className="form-control mt-3"
                            placeholder="Введите модель накопителя"
                            name="storage"
                            value={computerInputs.storage}
                            onChange={handleComputerInput}
                        />
                        <input
                            type="text"
                            className="form-control mt-3"
                            placeholder="Введите модель кулера"
                            name="processorCooler"
                            value={computerInputs.processorCooler}
                            onChange={handleComputerInput}
                        />
                        <input
                            type="text"
                            className="form-control mt-3"
                            placeholder="Введите модель корпуса"
                            name="case"
                            value={computerInputs.case}
                            onChange={handleComputerInput}
                        />
                        <input
                            type="text"
                            className="form-control mt-3"
                            placeholder="Введите цвет"
                            name="color"
                            value={computerInputs.color}
                            onChange={handleComputerInput}
                        />
                        <input
                            type="file"
                            onChange={handleFileChange}
                            className="form-control mt-3"
                        />
                        <div className="row">
                            <div className="col-6">
                                <button
                                    type="submit"
                                    className="btn btn-primary form-control mt-3"
                                >
                                    {id ? "Обновить" : "Добавить"}
                                </button>
                            </div>
                            <div className="col-6">
                                <a
                                    onClick={() =>
                                        navigate("/computer/computerlist")
                                    }
                                    className="btn btn-secondary form-control mt-3"
                                >
                                    Вернуться назад
                                </a>
                            </div>
                        </div>
                    </div>
                    <div className="col-md-5 text-center pt-3">
                        <img
                            src={imageToDisplay}
                            style={{ width: "100%", borderRadius: "30px" }}
                            alt=""
                        />
                    </div>
                </div>
            </form>
        </div>
    );
}

export default withAdminAuth(ComputerUpsert);
