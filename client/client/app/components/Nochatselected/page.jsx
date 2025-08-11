"use client"
const Nochatselected = () => {
  return (
    <div className="w-full h-[calc(100vh-120px)] bg-gray-900 flex flex-col items-center justify-center text-white rounded-lg">
      {/* Header */}
      <div className="w-full py-4 bg-gray-900 shadow-md text-center">
        <h1 className="text-3xl font-bold tracking-wide text-purple-400">BAAT✉️CHEET</h1>
      </div>

      {/* Message Box */}
      <div className="mt-20 bg-gray-800 p-6 rounded-xl shadow-lg animate-bounce duration-1000">
        <p className="text-lg text-center font-medium text-gray-200">Select a chat to start conversation 📩</p>
      </div>
    </div>
  );
};

export default Nochatselected;
