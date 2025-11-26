"use client";

import { useForm } from "@tanstack/react-form";
import { api } from "~/trpc/react";
import { Field, FieldError, FieldLabel } from "~/components/ui/field";
import { Input } from "~/components/ui/input";
import { Popover, PopoverContent, PopoverTrigger } from "~/components/ui/popover";
import { Button } from "~/components/ui/button";
import { Calendar } from "~/components/ui/calendar";
import { CalendarIcon } from "lucide-react";
import { format } from "date-fns";

interface CreateBookFormValues {
    title: string;
    summary: string;
    authors: string[];
    releaseDate: Date | undefined;
    tags: string[];
    cover: File | null;
    file: File | null;
}

export const CreateBookForm = () => {
    const createBook = api.books.createBook.useMutation();

    const form = useForm({
        defaultValues: {
            title: "",
            summary: "",
            authors: [""],
            releaseDate: undefined,
            tags: [""],
            cover: null,
            file: null,
        } satisfies CreateBookFormValues as CreateBookFormValues,

        onSubmit: async ({ value }) => {
            console.debug(value);
        },
    });

    const submit = (e: React.FormEvent) => {
        e.preventDefault();
        e.stopPropagation();
        form.handleSubmit();
    }

    return (
        <form className="flex flex-col gap-5" onSubmit={submit}>
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
            <form.Field name="summary">
                {(field) => {
                    const isInvalid =
                        field.state.meta.isTouched && !field.state.meta.isValid
                    return (
                        <Field data-invalid={isInvalid}>
                            <FieldLabel htmlFor={field.name}>Book Summary</FieldLabel>
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
            <form.Field name="releaseDate">
                {(field) => {
                    const isInvalid =
                        field.state.meta.isTouched && !field.state.meta.isValid;
                    const date = field.state.value; 
                    return (
                        <Field data-invalid={isInvalid}>
                            <FieldLabel htmlFor={field.name}>Release Date</FieldLabel>
                            <Popover>
                                <PopoverTrigger asChild>
                                    <Button
                                        variant="outline"
                                        data-empty={!date}
                                        className="data-[empty=true]:text-muted-foreground w-[280px] justify-start text-left font-normal"
                                    >
                                    <CalendarIcon />
                                    {date ? format(date, "PPP") : <span>Pick a date</span>}
                                    </Button>
                                </PopoverTrigger>
                                <PopoverContent className="w-auto p-0">
                                    <Calendar mode="single" selected={date} onSelect={(selected) => field.handleChange(selected)} />
                                </PopoverContent>
                            </Popover>
                            {isInvalid && <FieldError errors={field.state.meta.errors} />}
                        </Field>
                    )
                }}
            </form.Field>
            <form.Field name="authors">
                {(field) => {
                    const isInvalid =
                        field.state.meta.isTouched && !field.state.meta.isValid
                    return (
                        <Field data-invalid={isInvalid}>
                            <div className="flex flex-row gap-2">
                                <FieldLabel htmlFor={field.name}>Authors</FieldLabel>
                                <Button 
                                    size="sm"
                                    className="h-6"
                                    onClick={() => field.pushValue("")}
                                >
                                    + Add
                                </Button>
                            </div>
                            {field.state.value.map((_, i) => (
                                <form.Field key={`authors[${i}]`} name={`authors[${i}]`}>
                                    {(subField) => (
                                        <Input
                                            id={subField.name}
                                            name={subField.name}
                                            value={subField.state.value}
                                            onBlur={subField.handleBlur}
                                            onChange={(e) => subField.handleChange(e.target.value)}
                                            aria-invalid={isInvalid}
                                            autoComplete="off"
                                        />
                                    )}
                                </form.Field>
                            ))}
                            {isInvalid && <FieldError errors={field.state.meta.errors} />}
                        </Field>
                    )
                }}
            </form.Field>
            <form.Field name="tags">
                {(field) => {
                    const isInvalid =
                        field.state.meta.isTouched && !field.state.meta.isValid
                    return (
                        <Field data-invalid={isInvalid}>
                            <div className="flex flex-row gap-2">
                                <FieldLabel htmlFor={field.name}>Tags</FieldLabel>
                                <Button 
                                    size="sm"
                                    className="h-6"
                                    onClick={() => field.pushValue("")}
                                >
                                    + Add
                                </Button>
                            </div>
                            {field.state.value.map((_, i) => (
                                <form.Field key={`tags[${i}]`} name={`tags[${i}]`}>
                                    {(subField) => (
                                        <Input
                                            id={subField.name}
                                            name={subField.name}
                                            value={subField.state.value}
                                            onBlur={subField.handleBlur}
                                            onChange={(e) => subField.handleChange(e.target.value)}
                                            aria-invalid={isInvalid}
                                            autoComplete="off"
                                        />
                                    )}
                                </form.Field>
                            ))}
                            {isInvalid && <FieldError errors={field.state.meta.errors} />}
                        </Field>
                    )
                }}
            </form.Field>
            <form.Field name="cover">
                {(field) => {
                    const isInvalid =
                        field.state.meta.isTouched && !field.state.meta.isValid
                    return (
                        <Field data-invalid={isInvalid}>
                            <FieldLabel htmlFor={field.name}>File</FieldLabel>
                            <Input
                                id={field.name}
                                type="file"
                                accept="image/jpeg,image/png"
                                name={field.name}
                                onBlur={field.handleBlur}
                                onChange={(e) => {
                                    if (e.target.files?.length) field.handleChange(e.target.files.item(0))
                                }}
                                aria-invalid={isInvalid}
                            />
                            {isInvalid && <FieldError errors={field.state.meta.errors} />}
                        </Field>
                    )
                }}
            </form.Field>
            <form.Field name="file">
                {(field) => {
                    const isInvalid =
                        field.state.meta.isTouched && !field.state.meta.isValid
                    return (
                        <Field data-invalid={isInvalid}>
                            <FieldLabel htmlFor={field.name}>File</FieldLabel>
                            <Input
                                id={field.name}
                                type="file"
                                accept="application/epub+zip"
                                name={field.name}
                                onBlur={field.handleBlur}
                                onChange={(e) => {
                                    if (e.target.files?.length) field.handleChange(e.target.files.item(0))
                                }}
                                aria-invalid={isInvalid}
                            />
                            {isInvalid && <FieldError errors={field.state.meta.errors} />}
                        </Field>
                    )
                }}
            </form.Field>
            <form.Subscribe selector={(state) => [state.canSubmit, state.isSubmitting]}>
                {([canSubmit, isSubmitting]) => (
                    <Button type="submit" disabled={!canSubmit}>
                        {isSubmitting ? '...' : 'Submit'}
                    </Button>
                )}
            </form.Subscribe>
        </form>
    );
}