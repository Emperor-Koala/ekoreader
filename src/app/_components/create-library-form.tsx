"use client";

import { useForm } from "@tanstack/react-form";
import slugify from "slugify";
import { Button } from "~/components/ui/button";
import { Field, FieldError, FieldLabel } from "~/components/ui/field";
import { Input } from "~/components/ui/input";
import { api } from "~/trpc/react";

export const CreateLibraryForm = () => {
    const createLibrary = api.libraries.create.useMutation();

    const form = useForm({
        defaultValues: {
            name: "",
            rootFolder: "",
        },

        onSubmit: async ({value}) => {
            await createLibrary.mutateAsync(value);

            // TODO confirm?

            // TODO close modal?
        },
    });

    return (
        <form className="flex flex-col gap-5">
            <form.Field name="name">
                {(field) => {
                    const isInvalid =
                        field.state.meta.isTouched && !field.state.meta.isValid
                    return (
                        <Field>
                            <FieldLabel htmlFor={field.name}>Library Name</FieldLabel>
                            <Input
                                id={field.name}
                                name={field.name}
                                value={field.state.value}
                                onBlur={field.handleBlur}
                                onChange={(e) => field.handleChange(e.target.value)}
                                aria-invalid={isInvalid}
                                autoComplete="off"
                            />
                            {isInvalid && <FieldError errors={field.state.meta.errors} />}
                        </Field>
                    )
                }}
            </form.Field>
            <form.Field name="rootFolder">
                {(field) => {
                    const isInvalid =
                        field.state.meta.isTouched && !field.state.meta.isValid
                    return (
                        <Field>
                            <FieldLabel htmlFor={field.name}>Slug</FieldLabel>
                            <Input
                                id={field.name}
                                name={field.name}
                                value={field.state.value}
                                onBlur={field.handleBlur}
                                onChange={(e) => field.handleChange(e.target.value)}
                                aria-invalid={isInvalid}
                                autoComplete="off"
                            />
                            {isInvalid && <FieldError errors={field.state.meta.errors} />}
                        </Field>
                    )
                }}
            </form.Field>
            <form.Subscribe selector={(state) => [state.canSubmit, state.isSubmitting]}>
                {([canSubmit, isSubmitting]) => (
                    <Button onClick={form.handleSubmit} disabled={!canSubmit}>
                        {isSubmitting ? '...' : 'Submit'}
                    </Button>
                )}
            </form.Subscribe>
        </form>
    );
}