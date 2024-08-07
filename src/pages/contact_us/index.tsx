import React, { useEffect, useState } from "react";
import baseUrl from "../../constants/domain";
import { useTranslation } from "react-i18next";
import PhoneInput from "react-phone-input-2";
import "react-phone-input-2/lib/style.css";
import ReactGA from "react-ga4";

const ContactUs = () => {
  const { t } = useTranslation();
  useEffect(() => {
    ReactGA.send({
      hitType: "pageview",
      page: "/contact-us",
      title: "contact-us Page",
    });
  }, []);
  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    companyName: "",
    email: "",
    mobile: "",
    message: "",
  });
  const [mobileError, setMobileError] = useState("");
  const handlePhoneChange = (mobile: string) => {
    setFormData(prevData => ({
      ...prevData,
      mobile,
    }));
    setMobileError("");
  };
  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = e.target;
    setFormData(prevData => ({
      ...prevData,
      [name]: value,
    }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (
      !formData.mobile ||
      !/^\+?\d+$/.test(formData.mobile) ||
      formData.mobile.length <= 10
    ) {
      setMobileError("Invalid mobile number");
      return;
    }
    console.log(formData);
    try {
      const response = await fetch(`${baseUrl}/about/send-email`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          email: formData.email,
          name: formData.firstName + " " + formData.lastName,
          companyName: formData.companyName,
          mobile: formData.mobile,
          message: formData.message,
          subject: `New Inquiry from ${formData.firstName} ${formData.lastName}`,
        }),
      });

      if (response.ok) {
        console.log("Email sent successfully");
        alert("Your Inquiry sent successfully!");
      } else {
        console.error("Failed to send email");
        alert("Failed to send request. Please try again.");
      }
    } catch (error) {
      console.error("Error sending email:", error);
      alert("Failed to send request. Please try again.");
    }
    setFormData({
      firstName: "",
      lastName: "",
      companyName: "",
      email: "",
      mobile: "",
      message: "",
    });
  };

  return (
    <div className="py-1 px-4 md:p-16 w-full bg-slate-50">
      <div className="w-[98%] m-auto max-w-[1400px]">
        <div className="grid grid-cols-1 pb-8 text-center pt-4">
          <h3 className="mb-4 md:text-2xl text-xl font-bold font-header text-primary capitalize">
            {t("get_in_touch")}!
          </h3>
          <p className="text-secondary max-w-xl mx-auto font-body font-semibold">
            {t("get_in_touch_subtitle")}
          </p>
          <p className="text-gray-500 mt-2 font-body text-sm">
            {t("get_in_touch_subtitle_two")}
          </p>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 mx-auto md:mx-auto my-10 w-full gap-x-7">
          <div className="flex flex-col gap-8 bg-gray-background md:px-4">
            <div>
              <p className="mb-6 text-2xl font-semibold font-header capitalize text-primary">
                {t("location")}
              </p>
              <p className="font-semibold font-body text-gray-500 text-sm lg:text-lg  ">
                {t("location_det")}
              </p>
            </div>
            <div>
              {/* <iframe
                src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d14441.802897644364!2d55.288398869188605!3d25.188018192405522!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3e5f6831f6693c85%3A0xb5b269f7897f4978!2zT3BhbCBUb3dlciAtINin2YTYrtmE2YrYrCDYp9mE2KrYrNin2LHZiiAtINiv2KjZig!5e0!3m2!1sar!2sae!4v1709622847553!5m2!1sar!2sae"
                width="600"
                height="450"
                className="w-full"
                loading="lazy"
              ></iframe> */}
              <iframe
                src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d14442.157241247005!2d55.28449225477573!3d25.185028911501828!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3e5f682def25f457%3A0x3dd4c4097970950e!2z2KfZhNiu2YTZitisINin2YTYqtis2KfYsdmKIC0g2K_YqNmK!5e0!3m2!1sar!2sae!4v1721717189149!5m2!1sar!2sae"
                width="600"
                height="450"
                className="w-full"
                loading="lazy"
              ></iframe>
            </div>
          </div>
          <div className="border border-primary mt-4 md:mt-0 p-4 md:p-6 lg:p-8 rounded-lg">
            <h2 className="text-3xl font-semibold mb-4 font-header text-secondary">
              {t("contact_us")}
            </h2>
            <form onSubmit={handleSubmit}>
              <div className="grid grid-cols-12 gap-3 md:gap-5">
                <div className="col-span-6 mb-5">
                  <input
                    type="text"
                    id="firstName"
                    name="firstName"
                    value={formData.firstName}
                    onChange={handleChange}
                    placeholder={t("first_name")}
                    required
                    className="w-full p-2 border border-primary rounded h-10 outline-none bg-transparent focus:border-gray-600 text-[15px]"
                  />
                </div>
                <div className="col-span-6 mb-5">
                  <input
                    type="text"
                    id="lastName"
                    name="lastName"
                    value={formData.lastName}
                    onChange={handleChange}
                    placeholder={t("last_name")}
                    required
                    className="w-full p-2 border border-primary rounded h-10 outline-none bg-transparent focus:border-gray-600 text-[15px]"
                  />
                </div>
              </div>
              <div className="lg:col-span-6 mb-5">
                <input
                  type="text"
                  name="companyName"
                  id="companyName"
                  value={formData.companyName}
                  onChange={handleChange}
                  placeholder={t("company_name")}
                  className="w-full p-2 border border-primary rounded h-10 outline-none bg-transparent focus:border-gray-600 text-[15px]"
                />
              </div>
              <div className="col-span-6 mb-5">
                <input
                  type="email"
                  name="email"
                  id="email"
                  value={formData.email}
                  onChange={handleChange}
                  placeholder={t("your_email")}
                  required
                  className="w-full p-2 border border-primary rounded h-10 outline-none bg-transparent focus:border-gray-600 text-[15px]"
                />
              </div>
              <div className="col-span-6 mb-5">
                {/* <input
                  type="text"
                  name="mobile"
                  id="mobile"
                  value={formData.mobile}
                  onChange={handleChange}
                  placeholder={t("your_mobile_number")}
                  required
                  className="w-full p-2 border border-gray-600 rounded h-10 outline-none bg-transparent focus:border-primary text-[15px]"
                /> */}
                <PhoneInput
                  country={"ae"}
                  value={formData.mobile}
                  onChange={handlePhoneChange}
                  inputProps={{ required: true, autoFocus: false }}
                  placeholder={t("your_mobile_number")}
                  containerStyle={{ direction: "ltr" }}
                  inputStyle={{
                    width: "100%",
                    border: "1px solid #FFCF57",
                    borderRadius: "0.375rem",
                    fontSize: "15px",
                    outline: "none",
                    backgroundColor: "transparent",
                    height: "2.5rem",
                    direction: "ltr",
                  }}
                  buttonStyle={{
                    margin: 3,
                    direction: "ltr",
                  }}
                />
                {mobileError && (
                  <p className="text-red-500 text-sm">{mobileError}</p>
                )}
              </div>

              <div className="lg:col-span-6 mb-5">
                <textarea
                  name="message"
                  id="message"
                  value={formData.message}
                  onChange={handleChange}
                  className="w-full p-2 border border-primary rounded h-28 outline-none bg-transparent focus:border-gray-600 text-[15px]"
                  placeholder={t("your_message")}
                  required
                ></textarea>
              </div>
              <button
                type="submit"
                className="bg-primary w-full text-secondary py-3 px-5 rounded-md hover:bg-secondary hover:text-primary transition-colors duration-300"
              >
                {t("send_message")}
              </button>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ContactUs;
