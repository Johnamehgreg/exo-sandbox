import * as Yup from "yup";

export const BatchProjectModelTestSchema = Yup.object().shape({
  project_name: Yup.string().required("Transaction name is required"),
  project_location: Yup.object()
    .shape({
      location: Yup.string().required("Location is required"),
    })
    .required(),
  project_duration: Yup.object()
    .shape({
      start_date: Yup.string().required("Duration is required"),
    })
    .required(),
  tax_credits: Yup.object()
    .shape({
      employs_registered_apprentice: Yup.boolean().required(
        "Employ registered apprentices is required"
      ),
      meet_recommended_wages: Yup.boolean().required("Meet recommended wages"),
      materials_and_manufacturing_in_the_us: Yup.boolean().required(
        "Materials & manufacturing in the U.S.?"
      ),
    })
    .required(),

  analysis_case: Yup.object()
    .shape({
      analysis_case: Yup.string().required("Analysis case is required"),
      asset: Yup.object()
        .shape({
          asset_type: Yup.string()
            .required("Asset type is required")
            .oneOf(
              ["solar", "storage", "solar & storage"],
              "Asset type must be building, infrastructure, or land"
            ),
          size: Yup.array()
            .of(
              Yup.object().shape({
                unit: Yup.string().required("Unit is required"),
                value: Yup.number()
                  .required("Value is required")
                  .positive("Value must be positive")
                  .test(
                    "is-valid-number",
                    "Value must be a valid number",
                    (value) => !isNaN(value)
                  ),
                asset: Yup.string()
                  .required("Asset is required")
                  .min(2, "Asset name must be at least 2 characters"),
              })
            )
            .min(1, "At least one size entry is required"),
        })
        .required("Asset information is required"),
    })
    .optional(),
});
