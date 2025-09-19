export interface InputRedactionModel {
    showCorrection: boolean;
    showInputRedaction: boolean;
    content: string;
    textLimit: number;
    count: number;
    disableSubmit: boolean;
    onTextChange: (e) => e;
    localevaluateText: () => void;
}