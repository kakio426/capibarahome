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

  return (
    <Modal open={open} title="저장 내보내기/가져오기" onClose={onClose}>
      <label className="field-stack">
        <span>Export 코드</span>
        <textarea className="save-code-textarea" aria-label="Export 코드" readOnly value={exportCode} />
      </label>
      <label className="field-stack">
        <span>Import 코드</span>
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
