mod config;
mod db;
mod errors;

use axum::http::{HeaderName, Method};
use axum::{routing::get, Json, Router};
use serde_json::{json, Value};
use tower_http::cors::{AllowOrigin, CorsLayer};
use tower_http::trace::TraceLayer;
use tracing_subscriber::{layer::SubscriberExt, util::SubscriberInitExt, EnvFilter};
use utoipa::OpenApi;
use utoipa_swagger_ui::SwaggerUi;

use crate::config::Config;

#[derive(OpenApi)]
#[openapi(
    info(
        title = "MapDrop API",
        version = "0.1.0",
        description = "Creator-first social map platform API"
    ),
    paths(health_check),
    tags(
        (name = "health", description = "Health check endpoints"),
        (name = "auth", description = "Authentication endpoints"),
        (name = "users", description = "User profile endpoints"),
        (name = "maps", description = "Map CRUD endpoints"),
        (name = "locations", description = "Location CRUD endpoints"),
        (name = "categories", description = "Category CRUD endpoints"),
        (name = "geocode", description = "Geocoding proxy endpoints"),
    )
)]
struct ApiDoc;

#[utoipa::path(
    get,
    path = "/api/health",
    tag = "health",
    responses(
        (status = 200, description = "Service is healthy", body = Value)
    )
)]
async fn health_check() -> Json<Value> {
    Json(json!({ "status": "ok" }))
}

#[tokio::main]
async fn main() {
    dotenvy::dotenv().ok();

    tracing_subscriber::registry()
        .with(EnvFilter::try_from_default_env().unwrap_or_else(|_| "mapdrop_api=debug,tower_http=debug".into()))
        .with(tracing_subscriber::fmt::layer().json())
        .init();

    let config = Config::from_env();
    let pool = db::create_pool(&config).await;

    sqlx::migrate!("./migrations")
        .run(&pool)
        .await
        .expect("Failed to run migrations");

    let cors = CorsLayer::new()
        .allow_origin(AllowOrigin::exact(
            config.frontend_url.parse().expect("Invalid FRONTEND_URL"),
        ))
        .allow_methods([Method::GET, Method::POST, Method::PUT, Method::DELETE, Method::PATCH, Method::OPTIONS])
        .allow_headers([HeaderName::from_static("authorization"), HeaderName::from_static("content-type")])
        .allow_credentials(true);

    let app = Router::new()
        .route("/api/health", get(health_check))
        .merge(SwaggerUi::new("/swagger-ui").url("/api-docs/openapi.json", ApiDoc::openapi()))
        .layer(TraceLayer::new_for_http())
        .layer(cors)
        .with_state(pool);

    let addr = format!("0.0.0.0:{}", config.port);
    tracing::info!("Starting server on {}", addr);

    let listener = tokio::net::TcpListener::bind(&addr).await.unwrap();
    axum::serve(listener, app).await.unwrap();
}
