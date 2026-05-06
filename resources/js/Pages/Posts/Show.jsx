import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout';
import { Head, Link } from '@inertiajs/react';

export default function Show({ auth, post }) {
    return (
        <AuthenticatedLayout
            header={
                <h2 className="text-xl font-semibold leading-tight text-gray-800">
                    {post.title}
                </h2>
            }
        >
            <Head title={post.title} />

            <div className="py-12">
                <div className="mx-auto max-w-7xl sm:px-6 lg:px-8">
                    <div className="overflow-hidden bg-white shadow-sm sm:rounded-lg">
                        {post.image && (
                            <img
                                src={`/storage/${post.image}`}
                                alt={post.title}
                                className="h-96 w-full object-cover"
                            />
                        )}
                        <div className="p-6">
                            <div className="flex items-center justify-between">
                                <p className="text-sm text-gray-500">
                                    By <span className="font-semibold text-indigo-600">{post.user.name}</span>
                                </p>
                                <div className="flex items-center space-x-4">
                                    <Link
                                        href={route('posts.edit', post.id)}
                                        className="rounded-md bg-yellow-600 px-4 py-2 text-sm font-semibold text-white shadow-sm hover:bg-yellow-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-yellow-600"
                                    >
                                        Edit
                                    </Link>
                                    <Link
                                        href={route('posts.destroy', post.id)}
                                        method="delete"
                                        as="button"
                                        className="rounded-md bg-red-600 px-4 py-2 text-sm font-semibold text-white shadow-sm hover:bg-red-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-red-600"
                                    >
                                        Delete
                                    </Link>
                                </div>
                            </div>
                            <h3 className="mt-6 text-2xl font-bold">{post.title}</h3>
                            <div className="mt-4 prose max-w-none text-gray-700 whitespace-pre-wrap">
                                {post.content}
                            </div>
                            <div className="mt-8">
                                <Link
                                    href={route('posts.index')}
                                    className="text-indigo-600 hover:text-indigo-900"
                                >
                                    &larr; Back to Posts
                                </Link>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </AuthenticatedLayout>
    );
}
