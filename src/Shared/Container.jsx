
const Container = ({children}) => {
    return (
        <div className="max-w-[1440px] mx-auto px-5 lg:px-10">
            {children}
        </div>
    );
};

export default Container;