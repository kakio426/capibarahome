import { useMemo, useState } from "react";
import { GameActions } from "../../game/GameActions";
import { Modal } from "../components/Modal";
import { Button } from "../components/Button";

type SaveImportExportModalProps = {
  open: boolean;
  onClose: () => void;
};

export function SaveImportExportModal({ open, onClose }: SaveImportExportModalProps) {
  const exportCode = useMemo(() => (open ? GameActions.exportSave() : ""), [open]);
  const [importCode, setImportCode] = useState("");
  const [message, setMessage] = useState("");

  function importSave() {
    const result = GameActions.importSave(importCode);
    setMessage(result.ok ? "불러오기가 완료되었습니다." : result.error);
    if (result.ok) {
      setImportCode("");
    }
  }

  async function copyExportCode() {
    try {
      await navigator.clipboard.writeText(exportCode);
      setMessage("Export 코드를 복사했습니다.");
    } catch {
      setMessage("복사가 막혔습니다. Export 코드를 직접 선택해서 보관하세요.");
    }
  }

  return (
    <Modal open={open} title="저장 내보내기/가져오기" onClose={onClose} className="save-vault-modal ui-modal--vault" bodyClassName="save-vault-body ui-vault-body">
      <div className="vault-seal-row ui-vault-seal" aria-hidden="true">
        <span>보관함 봉인 코드</span>
        <strong>검증 도장</strong>
      </div>
      <label className="field-stack vault-code-slot ui-code-slot">
        <span className="field-heading">Export 코드</span>
        <textarea className="save-code-textarea" aria-label="Export 코드" readOnly value={exportCode} />
      </label>
      <div className="save-ledger-actions">
        <Button variant="secondary" onClick={copyExportCode} disabled={!exportCode}>Export 코드 복사</Button>
      </div>
      <label className="field-stack vault-code-slot ui-code-slot is-import">
        <span className="field-heading">Import 코드</span>
        <textarea
          className="save-import-textarea"
          aria-label="Import 코드"
          value={importCode}
          onChange={(event) => setImportCode(event.currentTarget.value)}
          placeholder="저장 코드를 붙여넣으세요."
        />
      </label>
      {message ? <p className="form-message">{message}</p> : null}
      <Button fullWidth onClick={importSave} disabled={!importCode.trim()}>저장 데이터 불러오기</Button>
    </Modal>
  );
}
