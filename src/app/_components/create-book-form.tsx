"use client";

import { useForm } from "@tanstack/react-form";
import { api } from "~/trpc/react";
import { Field, FieldError, FieldLabel } from "~/components/ui/field";
import { Input } from "~/components/ui/input";

interface CreateBookFormValues {
    title: string;
    summary: string;
    authors: string[];
    releaseDate: Date | null;
    tags: string[];
    bookFile: File | null;
}

export const CreateBookForm = () => {
    const createBook = api.books.createBook.useMutation();

    const form = useForm({
        defaultValues: {
            title: "",
            summary: "",
            authors: [],
            releaseDate: null,
            tags: [],
            bookFile: null,
        } satisfies CreateBookFormValues,

        onSubmit: async ({ value }) => {
            console.debug(value);
        },
    });

    return (
        <form>
            <form.Field name="title">
                {(field) => {
                    const isInvalid =
                    field.state.meta.isTouched && !field.state.meta.isValid
                    return (
                    <Field data-invalid={isInvalid}>
                        <FieldLabel htmlFor={field.name}>Book Title</FieldLabel>
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
        </form>
    );
}