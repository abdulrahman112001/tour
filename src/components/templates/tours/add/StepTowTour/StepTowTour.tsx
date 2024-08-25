import { useFormikContext } from "formik";
import { BaseInputField, TextAreaField } from "../../../../molecules";
import SelectCategory from "../../../../molecules/Select/SelectCategory";
import SelectCities from "../../../../molecules/Select/SelectCities";
import SelectCreateTags from "../../../../molecules/Select/SelectCreateTags";
import FrequentlyQuestions from "./FrequentlyQuestions";
import TourItineraries from "./TourItineraries";
import CKeditor from "../../../../molecules/Editor/CKeditor";

function StepTowTour() {
  const { values } = useFormikContext();
  console.log("🚀 ~ StepTowTour ~ values:", values);
  return (
    <div
      style={{
        height: "calc(100vh - 210px)",
        overflow: "scroll",
        padding: "10px",
      }}
    >
      <div className="grid grid-cols-3 gap-2">
        <BaseInputField
          name="title"
          type="text"
          label="title"
          placeholder="Title"
        />

        <BaseInputField
          name="duration"
          type="num"
          label={
            values?.type == "tour_package"
              ? "duration (Days)"
              : "duration (Hours)"
          }
          placeholder="Duration"
        />
        <SelectCategory
          name="category_id"
          label="category"
          placeholder="category"
        />

        <SelectCreateTags label="Tags" name="tags" />
        <BaseInputField name="age_range" type="text" label="Age Range" id="" />
        <BaseInputField name="run" type="text" label="Run" id="" />

        {/* <div className="col-span-3">
          <TextAreaField
            id="description"
            label="description"
            name="description"
            placeholder="Description"
            rows={5}
          />
        </div> */}
        <div className="col-span-3">
          <CKeditor
            label="Description"
            name="description"
            placeholder="Description"
          />
        </div>
        <div className="col-span-3 ">
          <TourItineraries />
        </div>
        <div className="col-span-2 ">
          <FrequentlyQuestions />
        </div>
      </div>
    </div>
  );
}

export default StepTowTour;
