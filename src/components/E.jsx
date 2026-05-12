export default function E({
  id,
  children,
  editMode,
  selectedId,
  onSelect,
  as: Tag = "span",
  style,
  className,
}) {
  const isSel = selectedId === id;
  const cls = [
    className,
    editMode ? "editable" : null,
    editMode && isSel ? "sel" : null,
  ]
    .filter(Boolean)
    .join(" ");

  const handleClick = (e) => {
    if (!editMode) return;
    e.stopPropagation();
    e.preventDefault();
    const text =
      typeof children === "string"
        ? children
        : e.currentTarget.textContent || "";
    onSelect?.(id, text);
  };

  return (
    <Tag
      data-edit-id={id}
      onClick={handleClick}
      className={cls || undefined}
      style={style}
    >
      {children}
    </Tag>
  );
}
