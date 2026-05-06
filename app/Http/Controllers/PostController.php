<?php

namespace App\Http\Controllers;

use App\Models\Post;
use App\Models\User;
use Illuminate\Http\RedirectResponse;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Storage;
use Inertia\Inertia;
use Inertia\Response;

class PostController extends Controller
{
    public function index(): Response
    {
        $posts = Post::with('user')->latest()->paginate(6);
        $trashedPosts = Post::onlyTrashed()->with('user')->latest('deleted_at')->get();

        return Inertia::render('Posts/Index', [
            'posts' => $posts,
            'trashedPosts' => $trashedPosts,
        ]);
    }

    public function create(): Response
    {
        $users = User::orderBy('name')->get();

        return Inertia::render('Posts/Create', [
            'users' => $users,
        ]);
    }

    public function store(Request $request): RedirectResponse
    {
        $validated = $request->validate([
            'user_id' => ['required', 'exists:users,id'],
            'title' => ['required', 'string', 'max:255'],
            'content' => ['required', 'string'],
            'image' => ['nullable', 'image', 'max:2048'],
        ]);

        if ($request->hasFile('image')) {
            $validated['image'] = $request->file('image')->store('posts', 'public');
        }

        $post = Post::create($validated);

        return redirect()
            ->route('posts.show', $post)
            ->with('success', 'Post created successfully.');
    }

    public function show(Post $post): Response
    {
        $post->load('user');

        return Inertia::render('Posts/Show', [
            'post' => $post,
        ]);
    }

    public function edit(Post $post): Response
    {
        $users = User::orderBy('name')->get();

        return Inertia::render('Posts/Edit', [
            'post' => $post,
            'users' => $users,
        ]);
    }

    public function update(Request $request, Post $post): RedirectResponse
    {
        $validated = $request->validate([
            'user_id' => ['required', 'exists:users,id'],
            'title' => ['required', 'string', 'max:255'],
            'content' => ['required', 'string'],
            'image' => ['nullable', 'image', 'max:2048'],
        ]);

        if ($request->hasFile('image')) {
            if ($post->image) {
                Storage::disk('public')->delete($post->image);
            }
            $validated['image'] = $request->file('image')->store('posts', 'public');
        }

        $post->update($validated);

        return redirect()
            ->route('posts.show', $post)
            ->with('success', 'Post updated successfully.');
    }

    public function destroy(Post $post): RedirectResponse
    {
        $post->delete();

        return redirect()
            ->route('posts.index')
            ->with('success', 'Post moved to trash successfully.');
    }

    public function forceDelete(string $postId): RedirectResponse
    {
        $post = Post::withTrashed()->findOrFail($postId);

        if ($post->image) {
            Storage::disk('public')->delete($post->image);
        }

        $post->forceDelete();

        return redirect()
            ->route('posts.index')
            ->with('success', 'Post deleted permanently.');
    }

    public function restore(string $postId): RedirectResponse
    {
        $post = Post::onlyTrashed()->findOrFail($postId);
        $post->restore();

        return redirect()
            ->route('posts.index')
            ->with('success', 'Post restored successfully.');
    }
}
