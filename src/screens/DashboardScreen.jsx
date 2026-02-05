import { useEffect, useRef, useState } from "react";
import { useMutation, useQuery } from "convex/react";
import { api } from "../../convex/_generated/api";
import Header from "../components/Header/Header";

function TrashIcon() {
  return (
    <svg
      width="15"
      height="15"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <polyline points="3 6 5 6 21 6" />
      <path d="M19 6v14a2 2 0 0 1-2 2H7a2 2 0 0 1-2-2V6m3 0V4a2 2 0 0 1 2-2h4a2 2 0 0 1 2 2v2" />
      <line x1="10" y1="11" x2="10" y2="17" />
      <line x1="14" y1="11" x2="14" y2="17" />
    </svg>
  );
}

function EditIcon() {
  return (
    <svg
      width="15"
      height="15"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <path d="M11 4H4a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2v-7" />
      <path d="M18.5 2.5a2.121 2.121 0 0 1 3 3L12 15l-4 1 1-4 9.5-9.5z" />
    </svg>
  );
}

function CheckIcon() {
  return (
    <svg
      width="15"
      height="15"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2.5"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <polyline points="20 6 9 17 4 12" />
    </svg>
  );
}

function XIcon() {
  return (
    <svg
      width="15"
      height="15"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2.5"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <line x1="18" y1="6" x2="6" y2="18" />
      <line x1="6" y1="6" x2="18" y2="18" />
    </svg>
  );
}

function PlusIcon() {
  return (
    <svg
      width="16"
      height="16"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2.5"
      strokeLinecap="round"
    >
      <line x1="12" y1="5" x2="12" y2="19" />
      <line x1="5" y1="12" x2="19" y2="12" />
    </svg>
  );
}

function ChevronIcon() {
  return (
    <svg
      width="16"
      height="16"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
      className="row-chevron"
    >
      <polyline points="9 18 15 12 9 6" />
    </svg>
  );
}

function MoreIcon() {
  return (
    <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor">
      <circle cx="12" cy="5" r="1.5" />
      <circle cx="12" cy="12" r="1.5" />
      <circle cx="12" cy="19" r="1.5" />
    </svg>
  );
}

function BackIcon() {
  return (
    <svg
      width="16"
      height="16"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <polyline points="15 18 9 12 15 6" />
    </svg>
  );
}

function DeleteConfirmModal({ onConfirm, onCancel, message }) {
  return (
    <div className="confirm-overlay">
      <div className="confirm-modal">
        <p className="confirm-title">Confirm Delete</p>
        <p className="confirm-message">{message}</p>
        <div className="confirm-actions">
          <button className="confirm-button confirm-cancel" onClick={onCancel}>
            Cancel
          </button>
          <button className="confirm-button confirm-delete" onClick={onConfirm}>
            Delete
          </button>
        </div>
      </div>
    </div>
  );
}

const ResourceTypeCard = ({
  resourceType,
  onRequestConfirm,
  createResource,
  updateResource,
  deleteResource,
  updateResourceType,
  deleteResourceType,
  createSource,
  updateSource,
  deleteSource,
}) => {
  const [view, setView] = useState("resources");
  const [selectedResourceId, setSelectedResourceId] = useState(null);
  const [slideDirection, setSlideDirection] = useState("");
  const [showMenu, setShowMenu] = useState(false);

  const [editingTitle, setEditingTitle] = useState(false);
  const [titleValue, setTitleValue] = useState(resourceType.name);

  const [editingResourceId, setEditingResourceId] = useState(null);
  const [editingResourceValue, setEditingResourceValue] = useState("");
  const [addingResource, setAddingResource] = useState(false);
  const [newResourceValue, setNewResourceValue] = useState("");

  const [editingSourceId, setEditingSourceId] = useState(null);
  const [editingSourceValues, setEditingSourceValues] = useState({
    name: "",
    url: "",
    description: "",
  });
  const [addingSource, setAddingSource] = useState(false);
  const [newSourceValues, setNewSourceValues] = useState({
    name: "",
    url: "",
    description: "",
  });

  const titleRef = useRef(null);
  const addResourceRef = useRef(null);
  const addSourceRef = useRef(null);
  const editResourceRef = useRef(null);
  const editSourceRef = useRef(null);
  const menuRef = useRef(null);

  const resources = resourceType.resources ?? [];
  const selectedResource = selectedResourceId
    ? resources.find((resource) => resource._id === selectedResourceId)
    : null;

  useEffect(() => {
    setTitleValue(resourceType.name);
  }, [resourceType.name]);

  useEffect(() => {
    if (editingTitle && titleRef.current) {
      titleRef.current.focus();
      titleRef.current.select();
    }
  }, [editingTitle]);

  useEffect(() => {
    if (addingResource && addResourceRef.current) {
      addResourceRef.current.focus();
    }
  }, [addingResource]);

  useEffect(() => {
    if (addingSource && addSourceRef.current) {
      addSourceRef.current.focus();
    }
  }, [addingSource]);

  useEffect(() => {
    if (editingResourceId && editResourceRef.current) {
      editResourceRef.current.focus();
      editResourceRef.current.select();
    }
  }, [editingResourceId]);

  useEffect(() => {
    if (editingSourceId && editSourceRef.current) {
      editSourceRef.current.focus();
      editSourceRef.current.select();
    }
  }, [editingSourceId]);

  useEffect(() => {
    const handler = (event) => {
      if (menuRef.current && !menuRef.current.contains(event.target)) {
        setShowMenu(false);
      }
    };
    document.addEventListener("mousedown", handler);
    return () => document.removeEventListener("mousedown", handler);
  }, []);

  useEffect(() => {
    if (view === "sources" && selectedResourceId && !selectedResource) {
      setView("resources");
      setSelectedResourceId(null);
    }
  }, [view, selectedResourceId, selectedResource]);

  const handleResourceClick = (resource) => {
    if (editingResourceId || addingResource) return;
    setAddingSource(false);
    setEditingSourceId(null);
    setSlideDirection("slide-left");
    setSelectedResourceId(resource._id);
    setTimeout(() => {
      setView("sources");
      setSlideDirection("slide-in-right");
    }, 150);
  };

  const handleGoBack = () => {
    setSlideDirection("slide-right");
    setTimeout(() => {
      setView("resources");
      setSelectedResourceId(null);
      setAddingSource(false);
      setEditingSourceId(null);
      setSlideDirection("slide-in-left");
    }, 150);
  };

  const confirmTitleEdit = async () => {
    const trimmed = titleValue.trim();
    if (trimmed && trimmed !== resourceType.name) {
      await updateResourceType({
        id: resourceType._id,
        name: trimmed,
        thumbnailUrl: resourceType.thumbnailUrl || undefined,
      });
    }
    setEditingTitle(false);
  };

  const startEditResource = (resource) => {
    setEditingResourceId(resource._id);
    setEditingResourceValue(resource.name);
  };

  const confirmEditResource = async (resource) => {
    const trimmed = editingResourceValue.trim();
    if (trimmed) {
      await updateResource({
        id: resource._id,
        name: trimmed,
        resourceTypeId: resource.resourceTypeId,
        sourceIds: (resource.sources || []).map((source) => source._id),
      });
    }
    setEditingResourceId(null);
  };

  const cancelEditResource = () => {
    setEditingResourceId(null);
  };

  const confirmAddResource = async () => {
    const trimmed = newResourceValue.trim();
    if (!trimmed) return;
    await createResource({
      name: trimmed,
      resourceTypeId: resourceType._id,
    });
    setNewResourceValue("");
    setAddingResource(false);
  };

  const confirmAddSource = async () => {
    if (!selectedResource) return;
    const trimmed = newSourceValues.name.trim();
    if (!trimmed) return;

    const sourceId = await createSource({
      name: trimmed,
      url: newSourceValues.url.trim() || undefined,
      description: newSourceValues.description.trim() || undefined,
    });

    const sourceIds = [
      ...(selectedResource.sources || []).map((source) => source._id),
      sourceId,
    ];

    await updateResource({
      id: selectedResource._id,
      name: selectedResource.name,
      resourceTypeId: selectedResource.resourceTypeId,
      sourceIds,
    });

    setNewSourceValues({ name: "", url: "", description: "" });
    setAddingSource(false);
  };

  const startEditSource = (source) => {
    setEditingSourceId(source._id);
    setEditingSourceValues({
      name: source.name,
      url: source.url ?? "",
      description: source.description ?? "",
    });
  };

  const confirmEditSource = async (source) => {
    const trimmed = editingSourceValues.name.trim();
    if (trimmed) {
      await updateSource({
        id: source._id,
        name: trimmed,
        url: editingSourceValues.url.trim() || undefined,
        description: editingSourceValues.description.trim() || undefined,
      });
    }
    setEditingSourceId(null);
  };

  const cancelEditSource = () => {
    setEditingSourceId(null);
  };

  const requestDeleteResource = (resource) => {
    onRequestConfirm({
      message: `Remove "${resource.name}" from ${resourceType.name}?`,
      onConfirm: async () => {
        await deleteResource({ id: resource._id });
      },
    });
  };

  const requestDeleteResourceType = () => {
    onRequestConfirm({
      message: `Delete the entire "${resourceType.name}" section and all its items?`,
      onConfirm: async () => {
        await deleteResourceType({ id: resourceType._id });
      },
    });
  };

  const requestDeleteSource = (source) => {
    if (!selectedResource) return;
    onRequestConfirm({
      message: `Remove "${source.name}" from ${resourceType.name}?`,
      onConfirm: async () => {
        await deleteSource({ id: source._id });
        const remainingSourceIds = (selectedResource.sources || [])
          .filter((item) => item._id !== source._id)
          .map((item) => item._id);
        await updateResource({
          id: selectedResource._id,
          name: selectedResource.name,
          resourceTypeId: selectedResource.resourceTypeId,
          sourceIds: remainingSourceIds,
        });
      },
    });
  };

  return (
    <div className="section-card">
      <div className="section-header">
        {editingTitle ? (
          <input
            ref={titleRef}
            value={titleValue}
            onChange={(event) => setTitleValue(event.target.value)}
            onKeyDown={(event) => {
              if (event.key === "Enter") confirmTitleEdit();
              if (event.key === "Escape") setEditingTitle(false);
            }}
            onBlur={confirmTitleEdit}
            className="section-title-input"
          />
        ) : (
          <span className="section-title">{resourceType.name}</span>
        )}
        <div className="section-actions" ref={menuRef}>
          <button
            className="icon-button icon-button-add"
            onClick={() => {
              if (view === "resources") {
                setAddingResource(true);
              } else {
                setAddingSource(true);
              }
            }}
            title={view === "resources" ? "Add item" : "Add source"}
          >
            <PlusIcon />
          </button>
          <button
            className="icon-button icon-button-menu"
            onClick={() => setShowMenu((prev) => !prev)}
          >
            <MoreIcon />
          </button>
          {showMenu && (
            <div className="section-menu">
              <button
                className="section-menu-item"
                onClick={() => {
                  setShowMenu(false);
                  setEditingTitle(true);
                }}
              >
                <EditIcon /> Rename Section
              </button>
              <div className="section-menu-divider" />
              <button
                className="section-menu-item section-menu-delete"
                onClick={() => {
                  setShowMenu(false);
                  requestDeleteResourceType();
                }}
              >
                <TrashIcon /> Delete Section
              </button>
            </div>
          )}
        </div>
      </div>

      <div className={`section-body ${slideDirection}`}>
        {view === "resources" && (
          <>
            {resources.map((resource) => {
              const isEditing = editingResourceId === resource._id;
              return (
                <div
                  key={resource._id}
                  className={`section-row ${isEditing ? "is-editing" : ""}`}
                  onClick={() => handleResourceClick(resource)}
                >
                  {isEditing ? (
                    <>
                      <input
                        ref={editResourceRef}
                        className="row-input"
                        value={editingResourceValue}
                        onChange={(event) =>
                          setEditingResourceValue(event.target.value)
                        }
                        onKeyDown={(event) => {
                          if (event.key === "Enter")
                            confirmEditResource(resource);
                          if (event.key === "Escape") cancelEditResource();
                        }}
                      />
                      <div className="row-edit-actions">
                        <button
                          className="icon-button icon-button-confirm"
                          onClick={(event) => {
                            event.stopPropagation();
                            confirmEditResource(resource);
                          }}
                        >
                          <CheckIcon />
                        </button>
                        <button
                          className="icon-button icon-button-cancel"
                          onClick={(event) => {
                            event.stopPropagation();
                            cancelEditResource();
                          }}
                        >
                          <XIcon />
                        </button>
                      </div>
                    </>
                  ) : (
                    <>
                      <span className="row-label">{resource.name}</span>
                      <div className="row-actions">
                        <button
                          className="icon-button icon-button-edit"
                          onClick={(event) => {
                            event.stopPropagation();
                            startEditResource(resource);
                          }}
                        >
                          <EditIcon />
                        </button>
                        <button
                          className="icon-button icon-button-delete"
                          onClick={(event) => {
                            event.stopPropagation();
                            requestDeleteResource(resource);
                          }}
                        >
                          <TrashIcon />
                        </button>
                      </div>
                      <ChevronIcon />
                    </>
                  )}
                </div>
              );
            })}

            {resources.length === 0 && !addingResource && (
              <div className="section-row empty-row">
                <span className="row-label">No resources yet</span>
              </div>
            )}

            {addingResource && (
              <div className="add-row">
                <input
                  ref={addResourceRef}
                  value={newResourceValue}
                  onChange={(event) => setNewResourceValue(event.target.value)}
                  onKeyDown={(event) => {
                    if (event.key === "Enter") confirmAddResource();
                    if (event.key === "Escape") setAddingResource(false);
                  }}
                  placeholder="New item..."
                  className="row-input"
                />
                <div className="row-edit-actions">
                  <button
                    className="icon-button icon-button-confirm"
                    onClick={confirmAddResource}
                  >
                    <CheckIcon />
                  </button>
                  <button
                    className="icon-button icon-button-cancel"
                    onClick={() => setAddingResource(false)}
                  >
                    <XIcon />
                  </button>
                </div>
              </div>
            )}
          </>
        )}

        {view === "sources" && selectedResource && (
          <>
            <div className="section-row back-row" onClick={handleGoBack}>
              <BackIcon />
              <span className="row-label">Go Back</span>
            </div>

            {(selectedResource.sources || []).map((source) => {
              const isEditing = editingSourceId === source._id;
              return (
                <div
                  key={source._id}
                  className={`section-row ${isEditing ? "is-editing" : ""}`}
                  onClick={() => {
                    if (isEditing) return;
                    if (source.url) {
                      window.open(source.url, "_blank", "noopener,noreferrer");
                    }
                  }}
                >
                  {isEditing ? (
                    <div className="row-input-stack">
                      <input
                        ref={editSourceRef}
                        className="row-input"
                        value={editingSourceValues.name}
                        onChange={(event) =>
                          setEditingSourceValues((prev) => ({
                            ...prev,
                            name: event.target.value,
                          }))
                        }
                        onKeyDown={(event) => {
                          if (event.key === "Enter")
                            confirmEditSource(source);
                          if (event.key === "Escape") cancelEditSource();
                        }}
                        placeholder="Source name"
                      />
                      <input
                        className="row-input"
                        value={editingSourceValues.url}
                        onChange={(event) =>
                          setEditingSourceValues((prev) => ({
                            ...prev,
                            url: event.target.value,
                          }))
                        }
                        placeholder="Source URL"
                      />
                      <input
                        className="row-input"
                        value={editingSourceValues.description}
                        onChange={(event) =>
                          setEditingSourceValues((prev) => ({
                            ...prev,
                            description: event.target.value,
                          }))
                        }
                        placeholder="Description"
                      />
                      <div className="row-edit-actions">
                        <button
                          className="icon-button icon-button-confirm"
                          onClick={(event) => {
                            event.stopPropagation();
                            confirmEditSource(source);
                          }}
                        >
                          <CheckIcon />
                        </button>
                        <button
                          className="icon-button icon-button-cancel"
                          onClick={(event) => {
                            event.stopPropagation();
                            cancelEditSource();
                          }}
                        >
                          <XIcon />
                        </button>
                      </div>
                    </div>
                  ) : (
                    <>
                      <span className="row-label">{source.name}</span>
                      <div className="row-actions">
                        <button
                          className="icon-button icon-button-edit"
                          onClick={(event) => {
                            event.stopPropagation();
                            startEditSource(source);
                          }}
                        >
                          <EditIcon />
                        </button>
                        <button
                          className="icon-button icon-button-delete"
                          onClick={(event) => {
                            event.stopPropagation();
                            requestDeleteSource(source);
                          }}
                        >
                          <TrashIcon />
                        </button>
                      </div>
                      <ChevronIcon />
                    </>
                  )}
                </div>
              );
            })}

            {(selectedResource.sources || []).length === 0 && !addingSource && (
              <div className="section-row empty-row">
                <span className="row-label">No sources linked</span>
              </div>
            )}

            {addingSource && (
              <div className="add-row add-row-stack">
                <div className="row-input-stack">
                  <input
                    ref={addSourceRef}
                    value={newSourceValues.name}
                    onChange={(event) =>
                      setNewSourceValues((prev) => ({
                        ...prev,
                        name: event.target.value,
                      }))
                    }
                    placeholder="Source name"
                    className="row-input"
                  />
                  <input
                    value={newSourceValues.url}
                    onChange={(event) =>
                      setNewSourceValues((prev) => ({
                        ...prev,
                        url: event.target.value,
                      }))
                    }
                    placeholder="Source URL"
                    className="row-input"
                  />
                  <input
                    value={newSourceValues.description}
                    onChange={(event) =>
                      setNewSourceValues((prev) => ({
                        ...prev,
                        description: event.target.value,
                      }))
                    }
                    placeholder="Description"
                    className="row-input"
                  />
                  <div className="row-edit-actions">
                    <button
                      className="icon-button icon-button-confirm"
                      onClick={confirmAddSource}
                    >
                      <CheckIcon />
                    </button>
                    <button
                      className="icon-button icon-button-cancel"
                      onClick={() => setAddingSource(false)}
                    >
                      <XIcon />
                    </button>
                  </div>
                </div>
              </div>
            )}
          </>
        )}
      </div>
    </div>
  );
};

const DashboardScreen = () => {
  const resourceTypesWithData = useQuery(
    api.resources.getResourceTypeWithResourcesAndSources,
  );

  const createResourceType = useMutation(api.resourceTypes.createResourceType);
  const updateResourceType = useMutation(api.resourceTypes.updateResourceType);
  const deleteResourceType = useMutation(api.resourceTypes.deleteResourceType);

  const createResource = useMutation(api.resources.createResource);
  const updateResource = useMutation(api.resources.updateResource);
  const deleteResource = useMutation(api.resources.deleteResource);

  const createSource = useMutation(api.sources.createSource);
  const updateSource = useMutation(api.sources.updateSource);
  const deleteSource = useMutation(api.sources.deleteSource);

  const [confirmState, setConfirmState] = useState(null);
  const [addingType, setAddingType] = useState(false);
  const [newTypeValue, setNewTypeValue] = useState("");
  const newTypeRef = useRef(null);

  useEffect(() => {
    if (addingType && newTypeRef.current) {
      newTypeRef.current.focus();
    }
  }, [addingType]);

  const data = resourceTypesWithData ?? [];
  const isLoading = resourceTypesWithData === undefined;

  const requestConfirm = ({ message, onConfirm }) => {
    setConfirmState({ message, onConfirm });
  };

  const confirmDelete = async () => {
    if (!confirmState) return;
    await confirmState.onConfirm();
    setConfirmState(null);
  };

  const confirmAddType = async () => {
    const trimmed = newTypeValue.trim();
    if (!trimmed) return;
    await createResourceType({ name: trimmed });
    setNewTypeValue("");
    setAddingType(false);
  };

  return (
    <>
      <Header />
      <main className="main-content dashboard-shell">
        <div className="content-container">
          <div className="dashboard-header">
            <h1 className="dashboard-title">My Resources</h1>
            <div className="dashboard-actions">
              {addingType ? (
                <div className="dashboard-add-inline">
                  <input
                    ref={newTypeRef}
                    className="row-input"
                    value={newTypeValue}
                    onChange={(event) => setNewTypeValue(event.target.value)}
                    onKeyDown={(event) => {
                      if (event.key === "Enter") confirmAddType();
                      if (event.key === "Escape") setAddingType(false);
                    }}
                    placeholder="New resource type..."
                  />
                  <div className="row-edit-actions">
                    <button
                      className="icon-button icon-button-confirm"
                      onClick={confirmAddType}
                    >
                      <CheckIcon />
                    </button>
                    <button
                      className="icon-button icon-button-cancel"
                      onClick={() => setAddingType(false)}
                    >
                      <XIcon />
                    </button>
                  </div>
                </div>
              ) : (
                <button
                  className="dashboard-add-button"
                  onClick={() => setAddingType(true)}
                >
                  <PlusIcon />
                  <span>New Resource Type</span>
                </button>
              )}
            </div>
          </div>

          {isLoading ? (
            <div className="text-center py-5 text-muted">Loading...</div>
          ) : data.length === 0 ? (
            <div className="text-center py-5 text-muted">
              No resource types yet. Add one to get started.
            </div>
          ) : (
            <div className="resource-cards-grid">
              {data.map((item) => (
                <ResourceTypeCard
                  key={item._id}
                  resourceType={item}
                  onRequestConfirm={requestConfirm}
                  createResource={createResource}
                  updateResource={updateResource}
                  deleteResource={deleteResource}
                  updateResourceType={updateResourceType}
                  deleteResourceType={deleteResourceType}
                  createSource={createSource}
                  updateSource={updateSource}
                  deleteSource={deleteSource}
                />
              ))}
            </div>
          )}
        </div>
      </main>

      {confirmState && (
        <DeleteConfirmModal
          message={confirmState.message}
          onConfirm={confirmDelete}
          onCancel={() => setConfirmState(null)}
        />
      )}
    </>
  );
};

export default DashboardScreen;
