import React from "react";

type HeaderProps = {
    title: string;
};

const Header: React.FC<HeaderProps> = ({ title }) => {
    return (
        <div className="bg-white border-b shadow-md">
            <div className="container mx-auto px-4 py-6 flex items-center gap-4">
                <h1 className="text-3xl font-extrabold text-gray-800">{title}</h1>
            </div>
        </div>
    );
};

export default Header;
