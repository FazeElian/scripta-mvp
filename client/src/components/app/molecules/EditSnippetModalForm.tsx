import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { BookText, Braces, Globe, NotepadText, Pencil } from 'lucide-react';

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
import type { EditSnippetModal, FormSnippet } from '@/types/snippets.type';

// Mutation
import { useUpdateSnippetMutation } from '@/services/snippets/mutations';

const visibilityOptions = Object.keys(visibilityMapping); // ["public", "private", "unListed"]

const EditSnippetModalForm = ({ snippet, formRef, onClose }: EditSnippetModal) => {
    const { register, formState: { errors }, handleSubmit } = useForm<FormSnippet>({
        resolver: zodResolver(formSnippetSchema),
        defaultValues: {
            title: snippet.title,
            description: snippet.description,
            lang: snippet.lang,
            visibility: snippet.visibility as "public" | "private" | "unListed",
        }
    });

    const mutation = useUpdateSnippetMutation(snippet.id);
    const onSubmit = (formData: FormSnippet) => {
        mutation.mutate(formData, {
            onSuccess: () => {
                onClose()
            }
        })
    }

    return (
        <section className="modal-overlay">
            <form
                ref={formRef}
                method="POST"
                className="form form-modal-cont"
                onSubmit={handleSubmit(onSubmit)}
            >
                <div className="form-head">
                    <div className="form-head--title">
                        <Pencil />
                        <h1>Edit snippet:</h1>
                    </div>
                    <h2>{snippet.title}</h2>
                </div>
                <div className="form-body">
                    <div className="input-group-2">
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
                </div>
                <div className="form-actions">
                    <button
                        type="button"
                        className="form-actions--btn-cancel"
                        onClick={onClose}
                    >
                        Cancel
                    </button>
                    <button
                        type="submit"
                        className="form-actions--btn-submit"
                    >
                        Update snippet info
                    </button>
                </div>
            </form>
        </section>
    );
};

export { EditSnippetModalForm };