"""Config flow for Wine Cellar Tracker."""

from __future__ import annotations

from typing import Any

import voluptuous as vol

from homeassistant.config_entries import ConfigFlow, OptionsFlow
from homeassistant.core import callback
from homeassistant.data_entry_flow import FlowResult

from .const import DOMAIN


class WineCellarConfigFlow(ConfigFlow, domain=DOMAIN):
    """Handle a config flow for Wine Cellar."""

    VERSION = 1

    async def async_step_user(
        self, user_input: dict[str, Any] | None = None
    ) -> FlowResult:
        """Handle the initial step."""
        if self._async_current_entries():
            return self.async_abort(reason="single_instance_allowed")

        if user_input is not None:
            return self.async_create_entry(
                title="Wine Cellar",
                data=user_input,
            )

        return self.async_show_form(
            step_id="user",
            data_schema=vol.Schema({}),
            description_placeholders={
                "info": "This will set up Wine Cellar Tracker with 4 default cabinet sections matching a standard wine rack layout."
            },
        )

    @staticmethod
    @callback
    def async_get_options_flow(config_entry):
        """Get the options flow."""
        return WineCellarOptionsFlow(config_entry)


class WineCellarOptionsFlow(OptionsFlow):
    """Handle options flow for Wine Cellar."""

    def __init__(self, config_entry) -> None:
        """Initialize options flow."""
        self.config_entry = config_entry

    async def async_step_init(
        self, user_input: dict[str, Any] | None = None
    ) -> FlowResult:
        """Manage options."""
        if user_input is not None:
            return self.async_create_entry(title="", data=user_input)

        return self.async_show_form(
            step_id="init",
            data_schema=vol.Schema({
                vol.Optional(
                    "default_wine_type",
                    default=self.config_entry.options.get("default_wine_type", "red"),
                ): vol.In(["red", "white", "rosé", "sparkling", "dessert"]),
            }),
        )
