export default interface ServiceResult {
    success: boolean;
    description: string;
    innerServiceResult?: ServiceResult | null;
    value?: unknown;
}

export type ClientResult<TFields, TValue> = { success: true; message: string; value: TValue } | { success: false; message: string; errors: TFields };
