import React from 'react';

const BlockedUser = () => {
    const [blockedUsers, setBlockedUsers] = React.useState([
        {
            id: 1,
            username: "John Doe",
            avatar: null
        },
        {
            id: 2,
            username: "Alex Morgan",
            avatar: null
        }
    ]);

    const handleUnblock = (id) => {
        setBlockedUsers((users) =>
            users.filter((user) => user.id !== id)
        );
    };

    return (
        <div
            style={{
                width: "100%",
                minHeight: "100%",
                height: "100%",
                background: "#0f0f0f",
                color: "#f5f5f5",
                boxSizing: "border-box",
                overflowY: "auto",
                overflowX: "hidden",
                WebkitOverflowScrolling: "touch"
            }}
        >
            <div
                style={{
                    padding: "18px 20px",
                    borderBottom: "1px solid #292929",
                    fontSize: "12px",
                    color: "#a7a7a7",
                    lineHeight: "1.5",
                    minHeight: "62px",
                    boxSizing: "border-box"

                    
                }}
            >
                Contacts you have blocked cannot call you or send you messages.
                You can unblock them at any time.
            </div>

            <div style={{ padding: "20px 16px 10px" }}>
                <div
                    style={{
                        fontSize: "15px",
                        fontWeight: 600,
                        marginBottom: "6px"
                    }}
                >
                    Blocked Users
                </div>

                <div
                    style={{
                        fontSize: "12px",
                        color: "#888"
                    }}
                >
                    {blockedUsers.length}{" "}
                    {blockedUsers.length === 1 ? "user" : "users"}
                </div>
            </div>

            <div style={{ padding: "8px 12px" }}>
                {blockedUsers.length > 0 ? (
                    blockedUsers.map((user) => (
                        <div
                            key={user.id}
                            style={{
                                display: "flex",
                                alignItems: "center",
                                gap: "12px",
                                padding: "14px 12px",
                                marginBottom: "8px",
                                borderRadius: "10px",
                                background: "#171717",
                                boxSizing: "border-box"
                            }}
                        >
                            <div
                                style={{
                                    width: "44px",
                                    height: "44px",
                                    minWidth: "44px",
                                    borderRadius: "50%",
                                    background: "#292929",
                                    display: "flex",
                                    alignItems: "center",
                                    justifyContent: "center",
                                    color: "#bdbdbd",
                                    fontSize: "18px",
                                    fontWeight: 600,
                                    overflow: "hidden"
                                }}
                            >
                                {user.avatar ? (
                                    <img
                                        src={user.avatar}
                                        alt={user.username}
                                        style={{
                                            width: "100%",
                                            height: "100%",
                                            objectFit: "cover"
                                        }}
                                    />
                                ) : (
                                    user.username.charAt(0).toUpperCase()
                                )}
                            </div>

                            <div style={{ flex: 1, minWidth: 0 }}>
                                <div
                                    style={{
                                        fontSize: "14px",
                                        fontWeight: 600,
                                        color: "#f5f5f5",
                                        overflow: "hidden",
                                        textOverflow: "ellipsis",
                                        whiteSpace: "nowrap"
                                    }}
                                >
                                    {user.username}
                                </div>

                                <div
                                    style={{
                                        fontSize: "12px",
                                        color: "#888",
                                        marginTop: "5px"
                                    }}
                                >
                                    Blocked contact
                                </div>
                            </div>

                            <button
                                type="button"
                                onClick={() => handleUnblock(user.id)}
                                style={{
                                    padding: "9px 13px",
                                    color: "#65a6ff",
                                    background: "rgba(0, 145, 234, .08)",
                                    border: "1px solid #303d50",
                                    borderRadius: "8px",
                                    fontSize: "13px",
                                    fontWeight: 600,
                                    cursor: "pointer",
                                    flexShrink: 0
                                }}
                            >
                                Unblock
                            </button>
                        </div>
                    ))
                ) : (
                    <div
                        style={{
                            display: "flex",
                            flexDirection: "column",
                            alignItems: "center",
                            justifyContent: "center",
                            padding: "55px 20px",
                            textAlign: "center",
                            color: "#888"
                        }}
                    >
                        <div style={{ marginBottom: "14px" }}>
                            <svg
                                width="42"
                                height="42"
                                viewBox="0 0 24 24"
                                fill="none"
                                stroke="currentColor"
                                strokeWidth="1.5"
                                strokeLinecap="round"
                                strokeLinejoin="round"
                            >
                                <circle cx="12" cy="12" r="10" />
                                <path d="m4.93 4.93 14.14 14.14" />
                            </svg>
                        </div>

                        <div
                            style={{
                                fontSize: "15px",
                                fontWeight: 600,
                                color: "#ddd",
                                marginBottom: "7px"
                            }}
                        >
                            No blocked Users Found
                        </div>

                        <div style={{ fontSize: "12px", lineHeight: "1.6" }}>
                            People you block will appear here.
                        </div>
                    </div>
                )}
            </div>
        </div>
    );
};


export default BlockedUser