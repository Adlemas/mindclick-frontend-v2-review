import type { ValidateErrorEntity } from "rc-field-form/lib/interface";
import { message } from "antd";

const handleFormError = (error: ValidateErrorEntity) => {
  if (error.errorFields.length > 1) {
    message.error("Пожалуйста, заполните все поля");
    return;
  }
  message.error(error.errorFields[0].errors[0]);
};

export default handleFormError;
