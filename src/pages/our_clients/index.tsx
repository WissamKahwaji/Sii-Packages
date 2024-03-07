import { motion } from "framer-motion";
import { useTranslation } from "react-i18next";
import { useGetClientsQuery } from "../../apis/our_clients/queries";
import { ClientsModel } from "../../apis/our_clients/type";

const OurClients = () => {
  const { t, i18n } = useTranslation();
  const selectedLang = i18n.language;
  const { data: clientsData, isLoading, isError } = useGetClientsQuery();

  if (isLoading) return <div>Loading...</div>;
  if (isError || !clientsData) return <div>Error...</div>;

  return (
    <div className="w-full py-8">
      <div className="text-center mb-8">
        <div className="sm:text-3xl text-2xl font-bold mb-5 text-secondary">
          {selectedLang === "en" ? (
            <>
              {t("our")}{" "}
              <span className="text-primary font-header">{t("clients")}</span>
            </>
          ) : (
            <>
              <span className="text-primary font-header">
                {t("our_clients")}
              </span>
            </>
          )}
        </div>
        <p className="hidden md:flex text-secondary font-body leading-7 max-w-[700px] text-start text-sm md:text-lg mx-5 md:mx-auto">
          {t("our_clients_bio")}
        </p>
      </div>
      <div className="grid grid-flow-row grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-8 w-3/4 mx-auto">
        {clientsData.map((client: ClientsModel, index: number) => (
          <motion.div
            key={index}
            className="flex flex-col items-center justify-center"
            whileHover={{
              scale: 1.05,
              // boxShadow: "0px 10px 15px rgba(0, 0, 0, 0.1)",
            }}
          >
            <div className="h-32 md:h-44 w-full p-3 rounded-lg hover:shadow-xl transition duration-300 transform hover:scale-105 border  hover:border-primary mb-2">
              <img
                src={client.logo}
                alt={client.name}
                className="w-auto h-20 md:h-32 object-contain mb-4  mx-auto"
              />
            </div>

            <p className="h-3 md:h-12 text-center font-semibold font-serif text-xs text-primary md:text-lg uppercase">
              {client.name}
            </p>
          </motion.div>
        ))}
      </div>
    </div>
  );
};

export default OurClients;
