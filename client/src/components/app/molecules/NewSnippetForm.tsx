import { useForm, Controller } from 'react-hook-form';
import { TagsInput } from '../atoms/TagsInput';
import { zodResolver } from '@hookform/resolvers/zod';
import { BookText, Braces, Globe, NotepadText, type LucideIcon } from 'lucide-react';
import { Link, useNavigate } from 'react-router-dom';

// Styles
import "@/assets/css/components/Forms.css";

// Subcomponents
import { InputTextGroup } from "@/components/app/atoms/InputTextGroup";
import { InputSelectGroup } from '../atoms/InputSelectGroup';
import { InputTextAreaGroup } from '../atoms/InputTextAreaGroup';

// Langs & visiblity
import { langOptions } from '@/lib/langs';
import { visibilityMapping } from '@/lib/visibility';

// Validation schema
import { formSnippetSchema } from '@/schemas/snippet.schema';

// Form type
import type { FormSnippetInput, FormSnippetOutput } from '@/types/snippets.type';

// Mutation
import { useNewSnippetMutation } from '@/services/snippets/mutations';

type NewSnippetFormType = {
    title: string;
    subtitle: string;
    icon: LucideIcon;
};

const visibilityOptions = Object.keys(visibilityMapping); // ["public", "private", "unListed"]

const NewSnippetForm = ({ title, subtitle, icon: Icon } : NewSnippetFormType) => {
    const { register, handleSubmit, formState: { errors }, control } = useForm<FormSnippetInput>({
        resolver: zodResolver(formSnippetSchema),
        defaultValues: {
            title: "",
            description: "",
            lang: "",
            visibility: "private",
            tags: [],
        }
    });

    const redirect = useNavigate();
    const mutation = useNewSnippetMutation();
    const onSubmit = (formData: FormSnippetInput) => {
        mutation.mutate(formData as FormSnippetOutput, {
            onSuccess: (res) => {
                redirect(`/app/snippets/editor/${res.id}`)
            }
        })
    }

    return (
        <form
            method="POST"
            className="form"
            onSubmit={handleSubmit(onSubmit)}
        >
            <div className="form-head">
                <div className="form-head--title">
                    {<Icon />}
                    <h1>{title}</h1>
                </div>
                <h2>{subtitle}</h2>
            </div>
            <div className="form-body">
                <div className="input-group-3">
                    <InputTextGroup
                        label="Title"
                        name="title"
                        icon={BookText}
                        placeholder="Example: Binary Search Implementation"
                        register={register}
                        error={errors.title}
                    />
                    <InputSelectGroup
                        label="Select Language"
                        name="lang"
                        icon={Braces}
                        placeholder="Select a language"
                        options={langOptions}
                        register={register}
                        error={errors.lang}
                    />
                    <InputSelectGroup
                        label="Visibility"
                        name="visibility"
                        icon={Globe}
                        options={visibilityOptions}
                        placeholder="Select who can view your snippet"
                        register={register}
                        error={errors.visibility}
                    />
                </div>
                <InputTextAreaGroup
                    label="Description (optional)"
                    name="description"
                    icon={NotepadText}
                    placeholder="A brief description of what this snippet does..."
                    register={register}
                    error={errors.description}
                />
                <Controller
                    name="tags"
                    control={control}
                    render={({ field }) => (
                        <TagsInput
                            value={field.value}
                            onChange={field.onChange}
                        />
                    )}
                />
            </div>
            <div className="form-actions">
                <Link
                    to="/app/dashboard"
                    className="form-actions--btn-cancel"
                >
                    Cancel
                </Link>
                <button
                    type="submit"
                    className="form-actions--btn-submit"
                >
                    {mutation.isPending ? "Preparating your snippet..." : "Create & Open Editor"}
                </button>
            </div>
        </form>
    )
}

export { NewSnippetForm };