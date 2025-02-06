import React from "react";

function Configurator() {
    return (
        <div className="container text-center mt-5">
            <h1 className="fw-bold">Конфигуратор ПК</h1>
            <p className="text-muted">
                Эта страница находится в разработке. Скоро здесь появится
                удобный инструмент для сборки вашего идеального компьютера!
            </p>
            <img
                src="https://dummyimage.com/500x300/000/fff&text=Configurator+Coming+Soon"
                alt="Заглушка конфигуратора"
                className="img-fluid mt-3 rounded shadow"
            />
        </div>
    );
}

export default Configurator;
