import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout';
import InputError from '@/Components/InputError';
import InputLabel from '@/Components/InputLabel';
import PrimaryButton from '@/Components/PrimaryButton';
import TextInput from '@/Components/TextInput';
import { Head, useForm } from '@inertiajs/react';

export default function Edit({ auth, post }) {
    const { data, setData, post: postRequest, processing, errors } = useForm({
        _method: 'put',
        title: post.title,
        content: post.content,
        image: null,
    });

    const submit = (e) => {
        e.preventDefault();
        postRequest(route('posts.update', post.id));
    };

    return (
        <AuthenticatedLayout
            header={
                <h2 className="text-xl font-semibold leading-tight text-gray-800">
                    Edit Post
                </h2>
            }
        >
            <Head title="Edit Post" />

            <div className="py-12">
                <div className="mx-auto max-w-7xl sm:px-6 lg:px-8">
                    <div className="overflow-hidden bg-white shadow-sm sm:rounded-lg">
                        <div className="p-6">
                            <form onSubmit={submit} className="space-y-6">
                                <div>
                                    <InputLabel htmlFor="title" value="Title" />
                                    <TextInput
                                        id="title"
                                        className="mt-1 block w-full"
                                        value={data.title}
                                        onChange={(e) => setData('title', e.target.value)}
                                        required
                                    />
                                    <InputError message={errors.title} className="mt-2" />
                                </div>

                                <div>
                                    <InputLabel htmlFor="content" value="Content" />
                                    <textarea
                                        id="content"
                                        className="mt-1 block w-full border-gray-300 focus:border-indigo-500 focus:ring-indigo-500 rounded-md shadow-sm"
                                        value={data.content}
                                        onChange={(e) => setData('content', e.target.value)}
                                        rows="5"
                                        required
                                    ></textarea>
                                    <InputError message={errors.content} className="mt-2" />
                                </div>

                                {post.image && (
                                    <div className="mt-4">
                                        <InputLabel value="Current Image" />
                                        <img
                                            src={`/storage/${post.image}`}
                                            alt={post.title}
                                            className="mt-2 h-32 w-auto"
                                        />
                                    </div>
                                )}

                                <div>
                                    <InputLabel htmlFor="image" value="New Image (Optional)" />
                                    <input
                                        id="image"
                                        type="file"
                                        className="mt-1 block w-full text-sm text-gray-500
                                            file:mr-4 file:py-2 file:px-4
                                            file:rounded-md file:border-0
                                            file:text-sm file:font-semibold
                                            file:bg-indigo-50 file:text-indigo-700
                                            hover:file:bg-indigo-100"
                                        onChange={(e) => setData('image', e.target.files[0])}
                                    />
                                    {data.image && (
                                        <div className="mt-4">
                                            <p className="text-sm text-gray-500 mb-2">New Image Preview:</p>
                                            <img
                                                src={URL.createObjectURL(data.image)}
                                                alt="New Preview"
                                                className="h-32 w-auto rounded-lg shadow-sm"
                                            />
                                        </div>
                                    )}
                                    <InputError message={errors.image} className="mt-2" />
                                </div>

                                <div className="flex items-center gap-4">
                                    <PrimaryButton disabled={processing}>Update</PrimaryButton>
                                </div>
                            </form>
                        </div>
                    </div>
                </div>
            </div>
        </AuthenticatedLayout>
    );
}
