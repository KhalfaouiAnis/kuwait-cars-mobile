import { BaseStepViewProps } from "@/core/components/ui";
import { FieldValues } from "react-hook-form";
import StepField from "../step-field";

export default function PlanSelection<T extends FieldValues>({ fields }: BaseStepViewProps<T>) {
    return <StepField config={fields.plan} />;
};