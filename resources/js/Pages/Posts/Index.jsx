import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout';
import { Head, Link } from '@inertiajs/react';

export default function Index({ auth, posts, trashedPosts }) {
    return (
        <AuthenticatedLayout
            header={
                <h2 className="text-xl font-semibold leading-tight text-gray-800">
                    Posts
                </h2>
            }
        >
            <Head title="Posts" />

            <div className="py-12">
                <div className="mx-auto max-w-7xl sm:px-6 lg:px-8">
                    <div className="mb-6 flex justify-between items-center">
                        <div className="flex items-center gap-4">
                            <h3 className="text-lg font-medium text-gray-900">All Posts</h3>
                            <Link
                                href={route('logout')}
                                method="post"
                                as="button"
                                className="text-sm font-medium text-gray-500 hover:text-gray-700"
                            >
                                Log Out
                            </Link>
                        </div>
                        <Link
                            href={route('posts.create')}
                            className="rounded-md bg-indigo-600 px-4 py-2 text-white hover:bg-indigo-700 transition duration-150 ease-in-out"
                        >
                            Create Post
                        </Link>
                    </div>

                    <div className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3">
                        {posts.data.map((post) => (
                            <div key={post.id} className="overflow-hidden bg-white shadow-sm sm:rounded-lg flex flex-col">
                                {post.image && (
                                    <img
                                        src={`/storage/${post.image}`}
                                        alt={post.title}
                                        className="h-48 w-full object-cover"
                                    />
                                )}
                                <div className="p-6 flex-grow flex flex-col">
                                    <h3 className="text-lg font-bold text-gray-900">{post.title}</h3>
                                    <p className="text-xs text-gray-400 font-mono">slug: {post.slug}</p>
                                    <p className="mt-1 text-sm text-gray-500">
                                        By <span className="font-semibold text-indigo-600">{post.user.name}</span>
                                    </p>
                                    <p className="mt-4 line-clamp-3 text-gray-700 flex-grow">
                                        {post.content}
                                    </p>
                                    <div className="mt-6 flex items-center justify-between border-t pt-4">
                                        <Link
                                            href={route('posts.show', post.id)}
                                            className="text-indigo-600 hover:text-indigo-900 font-medium"
                                        >
                                            View
                                        </Link>
                                        <div className="space-x-4">
                                            <Link
                                                href={route('posts.edit', post.id)}
                                                className="text-yellow-600 hover:text-yellow-900 font-medium"
                                            >
                                                Edit
                                            </Link>
                                            <Link
                                                href={route('posts.destroy', post.id)}
                                                method="delete"
                                                as="button"
                                                className="text-red-600 hover:text-red-900 font-medium"
                                            >
                                                Delete
                                            </Link>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        ))}
                    </div>

                    {posts.data.length === 0 && (
                        <p className="text-center text-gray-500 py-8">No active posts found.</p>
                    )}

                    {/* Pagination */}
                    {posts.links && posts.links.length > 3 && (
                        <div className="mt-8 flex justify-center space-x-2">
                            {posts.links.map((link, i) => (
                                link.url ? (
                                    <Link
                                        key={i}
                                        href={link.url.replace(/^(?:\/\/|[^\/]+)*\//, '/')}
                                        className={`px-3 py-1 rounded ${link.active ? 'bg-indigo-600 text-white' : 'bg-white text-gray-700 border hover:bg-gray-50'}`}
                                        dangerouslySetInnerHTML={{ __html: link.label }}
                                    />
                                ) : (
                                    <span
                                        key={i}
                                        className="px-3 py-1 rounded bg-white text-gray-400 border cursor-not-allowed"
                                        dangerouslySetInnerHTML={{ __html: link.label }}
                                    />
                                )
                            ))}
                        </div>
                    )}

                    {/* Trashed Posts Section */}
                    {trashedPosts && trashedPosts.length > 0 && (
                        <div className="mt-16 pt-8 border-t border-gray-200">
                            <h3 className="text-lg font-medium text-gray-900 mb-6">Trash (Deleted Posts)</h3>
                            <div className="overflow-x-auto bg-white shadow-sm sm:rounded-lg">
                                <table className="min-w-full divide-y divide-gray-200">
                                    <thead className="bg-gray-50">
                                        <tr>
                                            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Title</th>
                                            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Slug</th>
                                            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Author</th>
                                            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Deleted At</th>
                                            <th className="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">Actions</th>
                                        </tr>
                                    </thead>
                                    <tbody className="bg-white divide-y divide-gray-200">
                                        {trashedPosts.map((post) => (
                                            <tr key={post.id}>
                                                <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">{post.title}</td>
                                                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500 font-mono">{post.slug}</td>
                                                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{post.user.name}</td>
                                                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                                                    {new Date(post.deleted_at).toLocaleString()}
                                                </td>
                                                <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium space-x-4">
                                                    <Link
                                                        href={route('posts.restore', post.id)}
                                                        method="post"
                                                        as="button"
                                                        className="text-indigo-600 hover:text-indigo-900"
                                                    >
                                                        Restore
                                                    </Link>
                                                    <Link
                                                        href={route('posts.force-delete', post.id)}
                                                        method="delete"
                                                        as="button"
                                                        className="text-red-600 hover:text-red-900"
                                                        onBefore={() => confirm('Are you sure you want to permanently delete this post? This cannot be undone.')}
                                                    >
                                                        Delete Permanently
                                                    </Link>
                                                </td>
                                            </tr>
                                        ))}
                                    </tbody>
                                </table>
                            </div>
                        </div>
                    )}
                </div>
            </div>
        </AuthenticatedLayout>
    );
}
