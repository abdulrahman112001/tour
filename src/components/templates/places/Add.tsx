import { Form, Formik } from "formik";
import { t } from "i18next";
import {
  AllCurrencyTable_TP,
  initialValue_Tp,
  validationSchema,
} from "./Types&Validation";
import { useMutate } from "../../../hooks";
import { notify } from "../../../utils/toast";
import { HandleBackErrors } from "../../../utils/utils-components/HandleBackErrors";
import { OuterFormLayout } from "../../molecules";
import { Button } from "../../atoms";
import MainData from "./MainData";

type AddCurrency_TP = {
  refetch: () => void;
  update: any;
  data: any;
};
function Add({ refetch, update }: AddCurrency_TP) {
  const initialValues: initialValue_Tp = {
    name: update?.name || "",
    city_id: update?.city_id || "",
    latitude: update?.latitude || "",
    longitude: update?.longitude || "",
    images:
      update?.images?.map((item) => ({
        url: item.url,
        id: item?.id,
      })) || [],
    panar_image:  [],
  };
  const { mutate, isLoading } = useMutate({
    mutationKey: ["places"],
    endpoint: `places`,
    onSuccess: () => {
      refetch();
      notify("success");
    },
    onError: (err) => {
      notify("error", err?.response?.data?.message);
    },
    formData: true,
  });
  const { mutate: PostUpdate, isLoading: updateLoading } = useMutate({
    mutationKey: ["places"],
    endpoint: `places/${update?.id}`,
    onSuccess: () => {
      refetch();
      notify("success");
    },
    onError: (err) => {
      notify("error", err?.response?.data?.message);
    },
    formData: true,
  });

  const handleSubmit = (values: AllCurrencyTable_TP) => {
    const submissionData = { ...values };
    if (Object.entries(update).length) {
      PostUpdate({ ...submissionData, _method: "PUT" });
    } else {
      mutate(submissionData);
    }
  };

  return (
    <>
      <Formik
        initialValues={initialValues}
        // validationSchema={validationSchema}
        onSubmit={(values: any) => {
          const panar_image = values?.panar_image[0];
          handleSubmit({ ...values, panar_image: panar_image });
        }}
      >
        <Form>
          <HandleBackErrors>
            <OuterFormLayout
              header={""}
              submitComponent={
                <Button
                  type="submit"
                  className="mr-auto mx-5 mt-8"
                  loading={isLoading || updateLoading}
                >
                  {t("submit")}
                </Button>
              }
            >
              <MainData update={update} />
            </OuterFormLayout>
          </HandleBackErrors>
        </Form>
      </Formik>
          
    </>
  );
}

export default Add;
