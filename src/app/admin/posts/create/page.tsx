import { requireAdminForPage } from '@/server/auth/requireAdmin';
import CreatePostClient from '@/app/admin/posts/create/CreatePostClient';

export default async function CreatePostPage() {
  await requireAdminForPage();

  return (
    <div style={{ padding: 24 }}>
      <CreatePostClient />
    </div>
  );
}
