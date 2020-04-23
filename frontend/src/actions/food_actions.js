export const RECEIVE_FINAL_CHOICE = "RECEIVE_FINAL_CHOICE";

export const receiveFinalChoice = (finalChoice) => {
    return {
        type: RECEIVE_FINAL_CHOICE,
        finalChoice
    };
};