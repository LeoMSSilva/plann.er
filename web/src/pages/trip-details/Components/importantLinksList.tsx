import { Link2, Plus } from "lucide-react";
import { type FormEvent, useState } from "react";
import { ImportantLinksModal } from ".";
import { Button } from "../../../Components";
import type { ILink } from "../../../Interfaces";

interface IImportantLinksListProps {
  inputLinks: ILink[];
  handleCreateLinkModal: (value: FormEvent<HTMLFormElement>) => boolean;
}

export const ImportantLinksList = ({
  inputLinks,
  handleCreateLinkModal,
}: IImportantLinksListProps) => {
  const [isLinksModalOpen, setIsLinksModalOpen] = useState(false);

  function handleToggleCreateLinksModal(state: boolean) {
    setIsLinksModalOpen(state);
  }

  return (
    <>
      <div className="space-y-6">
        <span className="text-xl font-semibold text-zinc-50">
          Links importantes
        </span>
        <div className="space-y-5">
          {inputLinks.length > 0 ? (
            inputLinks.map((link) => (
              <div
                key={link.id}
                className="flex items-center justify-between gap-4"
              >
                <div className="space-y-1.5 flex-1">
                  <span className="block font-medium text-zinc-100">
                    {link.title}
                  </span>
                  <a
                    href={link.url}
                    className="block text-zinc-400 hover:text-zinc-200  truncate"
                  >
                    {link.url}
                  </a>
                </div>
                <Link2 className="size-5 text-zinc-400" />
              </div>
            ))
          ) : (
            <>Nenhum link cadastrado!</>
          )}
        </div>
        <Button
          size="full"
          variant="secondary"
          onClick={() => handleToggleCreateLinksModal(true)}
        >
          <Plus className="size-5" />
          Cadastrar novo link
        </Button>
      </div>

      {isLinksModalOpen && (
        <ImportantLinksModal
          handleToggleCreateLinksModal={handleToggleCreateLinksModal}
          handleCreateLinkModal={handleCreateLinkModal}
        />
      )}
    </>
  );
};
