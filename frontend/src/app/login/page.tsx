"use client";

import Link from "next/link";
import { useState } from "react";
import { useRouter } from "next/navigation";
import { Icon } from "@/components/icon";
import { setAccessToken } from "@/lib/api";

export default function LoginPage() {
  const router = useRouter();
  const [email, setEmail] = useState("");
  const [submitting, setSubmitting] = useState(false);

  const handleContinue = async (e?: React.FormEvent) => {
    e?.preventDefault();
    setSubmitting(true);
    // TODO: replace with apiFetch('/auth/email/start') once backend ships
    setTimeout(() => {
      setAccessToken("demo-token");
      router.push("/maps");
    }, 350);
  };

  return (
    <main
      style={{
        minHeight: "100vh",
        background: "var(--color-bg)",
        display: "flex",
        flexDirection: "column",
      }}
    >
      <div
        style={{
          height: 360,
          position: "relative",
          overflow: "hidden",
          background:
            "linear-gradient(160deg, #FDF0EB 0%, #FBF8F3 60%, #F5EBDC 100%)",
        }}
      >
        {[
          { e: "🍜", x: "18%", y: "30%", r: -8, d: 0 },
          { e: "🥢", x: "70%", y: "22%", r: 6, d: 120 },
          { e: "🌶️", x: "78%", y: "62%", r: -4, d: 240 },
          { e: "🍲", x: "30%", y: "70%", r: 8, d: 360 },
          { e: "🌿", x: "50%", y: "44%", r: 0, d: 480 },
        ].map((p, i) => (
          <div
            key={i}
            style={{
              position: "absolute",
              left: p.x,
              top: p.y,
              transform: `translate(-50%,-50%) rotate(${p.r}deg)`,
              animation: `fade-up 700ms var(--ease-spring) ${p.d}ms both`,
            }}
          >
            <div
              style={{
                width: 56,
                height: 56,
                borderRadius: "50%",
                background: "var(--color-surface)",
                border: "2px solid rgba(212,97,59,0.35)",
                boxShadow: "var(--shadow-md)",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                fontSize: 26,
              }}
            >
              {p.e}
            </div>
          </div>
        ))}
      </div>

      <form
        onSubmit={handleContinue}
        style={{
          flex: 1,
          padding: "24px 28px 0",
          display: "flex",
          flexDirection: "column",
          gap: 8,
          maxWidth: 480,
          width: "100%",
          margin: "0 auto",
        }}
      >
        <div
          style={{
            fontSize: 13,
            fontWeight: 500,
            letterSpacing: 1.6,
            textTransform: "uppercase",
            color: "var(--color-accent)",
          }}
        >
          MapDrop
        </div>
        <h1
          style={{
            fontFamily: "var(--font-display)",
            fontWeight: 600,
            fontSize: 44,
            lineHeight: 1.05,
            letterSpacing: -0.5,
            color: "var(--color-text)",
          }}
        >
          Your taste,
          <br />
          <em style={{ fontStyle: "italic", fontWeight: 500 }}>on the map.</em>
        </h1>
        <p
          style={{
            fontSize: 16,
            color: "var(--color-muted)",
            marginTop: 12,
            maxWidth: 320,
          }}
        >
          Beautiful, categorized maps from foodies and locals who actually know
          the spots. Curated, not crowdsourced.
        </p>

        <input
          type="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          placeholder="you@email.com"
          style={{
            marginTop: 24,
            height: 52,
            padding: "0 16px",
            background: "var(--color-surface)",
            border: "1px solid var(--color-border)",
            borderRadius: 12,
            fontSize: 15,
            color: "var(--color-text)",
            outline: "none",
            fontFamily: "var(--font-body)",
          }}
        />

        <div
          style={{
            marginTop: "auto",
            paddingTop: 24,
            paddingBottom: 32,
            display: "flex",
            flexDirection: "column",
            gap: 10,
          }}
        >
          <button
            type="submit"
            disabled={submitting}
            style={{
              height: 52,
              borderRadius: 12,
              background: "var(--color-accent)",
              color: "#fff",
              fontWeight: 600,
              fontSize: 16,
              boxShadow: "0 4px 14px rgba(212,97,59,0.35)",
              opacity: submitting ? 0.7 : 1,
            }}
          >
            {submitting ? "Hold on…" : "Continue with email"}
          </button>
          <div style={{ display: "flex", gap: 10 }}>
            <button type="button" onClick={() => handleContinue()} style={socialBtn}>
              <Icon name="apple" size={18} /> Apple
            </button>
            <button type="button" onClick={() => handleContinue()} style={socialBtn}>
              <Icon name="google" size={18} /> Google
            </button>
          </div>
          <p
            style={{
              fontSize: 12,
              color: "var(--color-muted)",
              textAlign: "center",
              marginTop: 8,
            }}
          >
            By continuing you agree to our{" "}
            <Link href="#" style={{ color: "var(--color-muted)" }}>Terms</Link> ·{" "}
            <Link href="#" style={{ color: "var(--color-muted)" }}>Privacy</Link>.
          </p>
        </div>
      </form>
    </main>
  );
}

const socialBtn: React.CSSProperties = {
  flex: 1,
  height: 48,
  borderRadius: 12,
  background: "var(--color-surface)",
  color: "var(--color-text)",
  border: "1px solid var(--color-border)",
  fontWeight: 500,
  fontSize: 15,
  display: "flex",
  alignItems: "center",
  justifyContent: "center",
  gap: 8,
};
