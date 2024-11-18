import Container from "../../components/container/Container";
import { FaLocationCrosshairs } from "react-icons/fa6";
import { FaPhoneAlt } from "react-icons/fa";
import { MdEmail } from "react-icons/md";

function Contact() {
  const contactItems = [
    { icon: <FaLocationCrosshairs />, label: "Address", value: "Glad Street" },
    { icon: <FaPhoneAlt />, label: "Phone", value: "903-234-4082" },
    { icon: <MdEmail />, label: "Email", value: "ragepo4149" },
  ];

  return (
    <div className="mt-5">
      <Container>
        <section className="text-center">
          <h1 className="my-5 text-4xl">Contact Us</h1>
          <p className="my-3 px-8">
            Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do
            eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim
            ad minim veniam r incididunt ut labore et dolore dolor sit amet,
            consectetur adipiscing eli.
          </p>
        </section>
        <div className="grid grid-cols-12 h-auto">
          <aside className="md:col-span-7 col-span-12 flex flex-col justify-center h-96 px-20">
            {contactItems.map((item, index) => (
              <div
                key={index}
                className="flex items-center justify-center my-5 w-full"
              >
                <span className="w-12 h-12 bg-gray-500 rounded-full flex items-center justify-center">
                  {item.icon}
                </span>
                <div className="flex flex-col ml-4 w-32">
                  <span>{item.label}</span>
                  <span>{item.value}</span>
                </div>
              </div>
            ))}
          </aside>
          <div className="md:col-span-5 col-span-12 flex md:justify-start justify-center items-center h-96">
            <form className="w-full max-w-xs bg-slate-500 shadow-md rounded px-8 pt-6 pb-8 h-96 ">
              <div className="mb-4 ">
                <label
                  className="block text-gray-700 text-sm font-bold mb-2"
                  htmlFor="username"
                >
                  Full Name
                </label>
                <input
                  className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                  id="username"
                  type="text"
                  placeholder=""
                />
              </div>
              <div className="mb-6">
                <label
                  className="block text-gray-700 text-sm font-bold mb-2"
                  htmlFor="email"
                >
                  Email
                </label>
                <input
                  className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 mb-3 leading-tight focus:outline-none focus:shadow-outline"
                  id="email"
                  type="email"
                  placeholder=""
                />
              </div>
              <div className="mb-6">
                <label
                  className="block text-gray-700 text-sm font-bold mb-2"
                  htmlFor="message"
                >
                  Type your message
                </label>
                <input
                  className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 mb-3 leading-tight focus:outline-none focus:shadow-outline"
                  id="message"
                  type="text"
                  placeholder=""
                />
              </div>
              <div className="flex items-center justify-between">
                <button
                  className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
                  type="button"
                >
                  Send
                </button>
              </div>
            </form>
          </div>
        </div>
      </Container>
    </div>
  );
}

export default Contact;
