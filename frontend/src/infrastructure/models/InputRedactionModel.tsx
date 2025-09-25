export interface InputRedactionModel {
    showCorrection: boolean;
    showInputRedaction: boolean;
    content: string;
    textLimit: number;
    count: number;
    disableSubmit: boolean;
    onTextChange: (e: React.ChangeEvent<HTMLTextAreaElement>) => React.ChangeEvent<HTMLTextAreaElement>;
    localevaluateText: () => void;
}