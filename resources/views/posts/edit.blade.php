<!DOCTYPE html>
<html lang="{{ str_replace('_', '-', app()->getLocale()) }}">
<head>
    <meta charset="utf-8">
    <meta name="viewport" content="width=device-width, initial-scale=1">
    <title>Edit Post</title>
    @vite(['resources/css/app.css', 'resources/js/app.js'])
</head>
<body class="min-h-screen bg-slate-100 text-slate-900">
    <div class="absolute inset-0 -z-10 bg-[radial-gradient(circle_at_20%_0%,_#fde68a,_transparent_35%),radial-gradient(circle_at_90%_0%,_#bfdbfe,_transparent_35%),linear-gradient(180deg,_#fff7ed,_#f8fafc)]"></div>

    <main class="mx-auto max-w-3xl px-4 py-10 sm:px-6 lg:px-8">
        <section class="overflow-hidden rounded-2xl border border-slate-200 bg-white shadow-sm">
            <header class="border-b border-slate-100 bg-slate-50 px-6 py-5">
                <h1 class="text-3xl font-bold text-slate-900">Edit Post</h1>
            </header>

            <div class="px-6 py-6">
                @if ($errors->any())
                    <div class="mb-6 rounded-lg border border-red-200 bg-red-50 p-4 text-sm text-red-700">
                        <p class="font-semibold">Please fix the following errors:</p>
                        <ul class="mt-2 list-disc pl-5">
                            @foreach ($errors->all() as $error)
                                <li>{{ $error }}</li>
                            @endforeach
                        </ul>
                    </div>
                @endif

                <form action="{{ route('posts.update', $post) }}" method="POST" class="space-y-5">
                    @csrf
                    @method('PUT')

                    <div>
                        <label for="title" class="mb-2 block text-sm font-medium text-slate-700">Title</label>
                        <input
                            id="title"
                            name="title"
                            type="text"
                            value="{{ old('title', $post->title) }}"
                            class="w-full rounded-lg border border-slate-300 px-4 py-2.5 text-sm shadow-sm outline-none transition focus:border-amber-500 focus:ring-2 focus:ring-amber-200"
                            required
                        >
                    </div>

                    <div>
                        <label for="content" class="mb-2 block text-sm font-medium text-slate-700">Content</label>
                        <textarea
                            id="content"
                            name="content"
                            rows="8"
                            class="w-full rounded-lg border border-slate-300 px-4 py-2.5 text-sm shadow-sm outline-none transition focus:border-amber-500 focus:ring-2 focus:ring-amber-200"
                            required
                        >{{ old('content', $post->content) }}</textarea>
                    </div>

                    <div class="flex flex-wrap items-center justify-end gap-3 border-t border-slate-100 pt-4">
                        <a href="{{ route('posts.show', $post) }}" class="rounded-lg border border-slate-300 px-4 py-2 text-sm font-medium text-slate-700 transition hover:bg-slate-50">Cancel</a>
                        <button type="submit" class="rounded-lg bg-amber-500 px-4 py-2 text-sm font-semibold text-white transition hover:bg-amber-600">Update Post</button>
                    </div>
                </form>
            </div>
        </section>
    </main>
</body>
</html>
