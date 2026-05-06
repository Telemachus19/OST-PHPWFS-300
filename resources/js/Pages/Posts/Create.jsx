import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout';
import InputError from '@/Components/InputError';
import InputLabel from '@/Components/InputLabel';
import PrimaryButton from '@/Components/PrimaryButton';
import TextInput from '@/Components/TextInput';
import { Head, useForm } from '@inertiajs/react';

export default function Create({ auth, users }) {
    const { data, setData, post, processing, errors } = useForm({
        user_id: '',
        title: '',
        content: '',
        image: null,
    });

    const submit = (e) => {
        e.preventDefault();
        post(route('posts.store'));
    };

    return (
        <AuthenticatedLayout
            header={
                <h2 className="text-xl font-semibold leading-tight text-gray-800">
                    Create Post
                </h2>
            }
        >
            <Head title="Create Post" />

            <div className="py-12">
                <div className="mx-auto max-w-7xl sm:px-6 lg:px-8">
                    <div className="overflow-hidden bg-white shadow-sm sm:rounded-lg">
                        <div className="p-6">
                            <form onSubmit={submit} className="space-y-6">
                                <div>
                                    <InputLabel htmlFor="user_id" value="Author" />
                                    <select
                                        id="user_id"
                                        className="mt-1 block w-full border-gray-300 focus:border-indigo-500 focus:ring-indigo-500 rounded-md shadow-sm"
                                        value={data.user_id}
                                        onChange={(e) => setData('user_id', e.target.value)}
                                        required
                                    >
                                        <option value="">Select an author</option>
                                        {users.map((user) => (
                                            <option key={user.id} value={user.id}>
                                                {user.name}
                                            </option>
                                        ))}
                                    </select>
                                    <InputError message={errors.user_id} className="mt-2" />
                                </div>

                                <div>
                                    <InputLabel htmlFor="title" value="Title" />
                                    <TextInput
                                        id="title"
                                        className="mt-1 block w-full"
                                        value={data.title}
                                        onChange={(e) => setData('title', e.target.value)}
                                        required
                                        isFocused
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

                                <div>
                                    <InputLabel htmlFor="image" value="Image" />
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
                                            <p className="text-sm text-gray-500 mb-2">Image Preview:</p>
                                            <img
                                                src={URL.createObjectURL(data.image)}
                                                alt="Preview"
                                                className="h-32 w-auto rounded-lg shadow-sm"
                                            />
                                        </div>
                                    )}
                                    <InputError message={errors.image} className="mt-2" />
                                </div>

                                <div className="flex items-center gap-4">
                                    <PrimaryButton disabled={processing}>Create</PrimaryButton>
                                </div>
                            </form>
                        </div>
                    </div>
                </div>
            </div>
        </AuthenticatedLayout>
    );
}
