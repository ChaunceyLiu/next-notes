import React, { Suspense } from "react";
import Link from "next/link";
import { getAllNotes } from "@/lib/redis";
import SidebarSearchField from '@/app/components/SidebarSearchField';
import SidebarNoteList from "@/app/components/SidebarNoteList";
import EditButton from "@/app/components/EditButton";
import NoteListSkeleton from "@/app/components/NoteListSkeleton";
import SidebarImport from '@/app/components/SidebarImport';
import { useTranslation } from "@/app/i18n/index.js"

export default async function Sidebar({lng}) {
  const { t } = await useTranslation(lng)
  return (
    <>
      <section className="col sidebar">
        <Link href={'/'} className="link--unstyled">
          <section className="sidebar-header">
            <img
              className="logo"
              src="/logo.svg"
              width="22px"
              height="20px"
              alt=""
              role="presentation"
              />
            <strong>React Notes</strong>

          </section>

        </Link>

        <section className="sidebar-menu" role="menubar">
          <SidebarSearchField lng={lng} />
          <EditButton noteId={null}>{t('new')}</EditButton>

        </section>

        <nav>
          <Suspense fallback={<NoteListSkeleton />}>
            <SidebarNoteList />
          </Suspense>

        </nav>
        <SidebarImport />
      </section>

    </>
  )
}
