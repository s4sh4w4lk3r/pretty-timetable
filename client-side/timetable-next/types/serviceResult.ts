export default interface ServiceResult {
    success: boolean;
    description: string;
    innerServiceResult?: ServiceResult | null;
    value?: unknown;
}
