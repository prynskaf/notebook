import Image from "next/image";
const LoadingSpinner = () => {
  return (
    <div
      style={{
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        height: "40%",
        width: "100%",
      }}
    >
      <Image
        src="/loading.gif"
        width={50}
        height={50}
        alt="Loading..."
        unoptimized
      />
    </div>
  );
};

export default LoadingSpinner;
