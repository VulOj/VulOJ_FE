import { ValidateStatus } from "antd/lib/form/FormItem";

export interface IFormValidate {
    validateStatus: ValidateStatus,
    hasFeedback?: boolean,
    help?: string
}

export interface IBlockTag {
    name: string,
    display: string
}