import { ENABLE_ENTER_SUBMIT } from "../config/enterSubmissionConfig";

export const handleEnterSubmit = (e, submitCallback) => {
    if (ENABLE_ENTER_SUBMIT && e.key === "Enter") {
      e.preventDefault();
      submitCallback();
    }
  };